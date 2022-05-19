## :pencil: Table of Contents

- [Part 1. 프로젝트 소개](#1-프로젝트-소개)
- [Part 2. 사용 기술 스택](#2-사용-기술-스택)
- [Part 3. 아키텍처](#3-아키텍처)
- [Part 4. 추가 기능](#4-추가-기능)
- [Part 5. 이슈 정리](#5-이슈-정리)  
- [Part 6. 보완할 점](#6-보완할-점)

<br><br>

# 1. 프로젝트 소개
**The Rank of Korea (2022)\_version2**

"**내가 조선 시대로 돌아가 정치를 한다면?**"을 주제로 한 **언론형 커뮤니티플랫폼**입니다. 프로젝트의 목적은 이전에 개발했던 [The Rank of Korea (2021)_version1](https://github.com/s2lee/rok_version1) 의 코드를 리팩토링하고 새로운 기술 스택을 익히고자 함입니다.

❗️ **The Rank of Korea (2022)_version2** -> **https://therok.net**

🛠 **목표 기술 스택 및 학습 방향**
1. Django(DRF)-React-Nginx-Gunicorn-PostgreSQL-AWS
2. DB - PostgreSQL, Redis
3. Index, Cache 사용
4. Celery(Redis)
5. Docker
6. Version Control System(Git)
7. Test Code 작성
8. Code Refactoring(OOP, DRY)
9. Linux 환경 적응
10. Vim 사용

<br><br>

# 2. 사용 기술 스택
### Frontend
<p>
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"/>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
</p>

### Backend
<p>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
    <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=Django&logoColor=white"/>
    <img src="https://img.shields.io/badge/Celery-37814A?style=flat-square&logo=Celery&logoColor=white"/>
    <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/><br>
    <img src="https://img.shields.io/badge/Gunicorn-499848?style=flat-square&logo=Gunicorn&logoColor=white"/>
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white"/>
    <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/>
    <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=Amazon AWS&logoColor=white"/>
</p>

### Tools
<p>
    <img src="https://img.shields.io/badge/Pycharm-000000?style=flat-square&logo=Pycharm&logoColor=white"/>
    <img src="https://img.shields.io/badge/Visual Studio-5C2D91?style=flat-square&logo=Visual Studio&logoColor=white"/>
    <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
</p>

### Version
<p>
    <img src="https://img.shields.io/badge/python-v3.9.6-blue">
    <img src="https://img.shields.io/badge/django-v3.2.6-092E20">
    <img src="https://img.shields.io/badge/celery-5.2.3-37814A">
    <img src="https://img.shields.io/badge/ec2%3Aubuntu-v22.04-blue">
</p>

**etc.**
- Code Style Guides - flake8, isort, black
- SSL - Let's Encrypt(Certbot)

<br><br>
# 3. 아키텍처
<img src="https://user-images.githubusercontent.com/82914197/169293309-7e1e9368-1fad-4516-8879-55f76e92b01a.jpg">

<br><br>

# 4. 추가 기능

### 매일 자정 인기가 좋은 기사 3개를 오늘의 신문으로 선정하고 기사를 작성한 사람에게 포인트를 부여하는 기능:sparkles: 

**1. DRY를 위해 Django Manager에서 Custom QuerySet을 사용**
```python
class ArticleVoteManager(models.Manager):
    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .annotate(
                total_votes=Count("spear", distinct=True)
                - Count("shield", distinct=True)
            )
            .order_by("-total_votes")
        )

class Article(models.Model):
    ...

    objects_sorted_by_vote = ArticleVoteManager()
```

**2. Celery를 사용하여 작업 주기 설정 및 작업 수행**
```python
CELERY_BEAT_SCHEDULE = {
    'choose_article_every_midnight': {
        'task': 'news.tasks.choose_article_every_midnight',
        'schedule': crontab(minute=0, hour=0),
    },
}

...

@shared_task
def choose_article_every_midnight():
    try:
        categories = Category.objects.all()
        for category in categories:
            articles = Article.objects_sorted_by_vote.filter(
                category=category, date_posted__date=date.today()
            )[:3]
            for article in articles:
                article.is_news = True
                article.save()
                user = User.objects.get(username=article.author)
                user.point += 50
                user.save()
    except ValueError as e:
        print(e)
    else:
        return "success"
```

### 날짜별 신문 검색기능 :newspaper:
프론트단에서 찾고자 하는 신문의 날짜를 검색하면 해당 API를 호출하는데 이 API는 읽기 작업만 있기 때문에 DB의 접근을 최소화하면 좋을 것 같아 Query 캐시 사용. 결과적으로 해당 신문을 DB에서 가져오는것이 아니라 Redis에서 가져와서 Client에 빠르게 서빙
```python
class SearchNewsByDate(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SearchNewsByDateSerializer

    def get(self, request, *args, **kwargs):
        return self.get_response()

    def get_news_date(self):
        year = self.kwargs.get("year")
        month = self.kwargs.get("month")
        day = self.kwargs.get("day")
        return datetime.strptime(f"{year}-{month}-{day}", "%Y-%m-%d")

    def get_queryset(self):
        news_date = self.get_news_date()
        articles = Article.objects_sorted_by_vote.select_related("category").filter(
            date_posted__date=news_date, is_news=True
        )
        return articles

    def divide_articles_by_category(self):
        articles = self.get_queryset()
        categories = Category.objects.all()
        divided_articles = {}
        for category in categories:
            articles_by_category = articles.filter(category__name=category)[:3]
            serializer = self.get_serializer(articles_by_category, many=True)
            divided_articles[f"{category}"] = serializer.data
        return divided_articles

    def get_newspaper(self):
        newspaper = cache.get(f"newspaper_{self.get_news_date()}")
        if not newspaper:
            newspaper = self.divide_articles_by_category()
            cache.set(f"newspaper_{self.get_news_date()}", newspaper, 3600)
        return newspaper

    def get_response(self):
        newspaper = self.get_newspaper()
        response = Response(newspaper, status=status.HTTP_200_OK)
        if not any(newspaper.values()):
            response.data = {"detail": f"{self.get_news_date()}의 기사는 없습니다."}
        return response
```

<br><br>

# 5. 이슈 정리
- docker celery RecursionError: maximum recursion depth exceeded while calling a Python object 문제 —> celery 이미지를 backend 것을 가져다 쓰는데 .env.dev 파일을 지정해주지 않아서
- media 폴더가 생성되는 위치 문제 -> BASE_DIR = Path(__file__).resolve().parent.parent.parent로 해결
- React에서 reply 를 어떻게 입력할 수 있을까? —> 재귀 구조로 comment form 재사용
- docker Pillow error —> Dockerfile에 && pip install Pillow && apk add libffi-dev 입력
- aws-rok docker certbot error —> ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ") 인데 DJANGO_ALLOWED_HOSTS를 콤마 구분으로 입력해서
- Up/Down button api 확장성 —> getattr(article, choice)를 사용해서 choice에 맞게 함수 수행
- get_total_point()=self.spear.count - self.shield.count 가 여러번 사용되니깐 serializers에 두지말고 models에 두고 manager 만들어서 한번만 정의
- ec2 docker build 문제 sh: react-scripts: not found —> node modules 원인
- nginx - react 연결시 흰 화면만 나오는 문제 —> nginx에서 frontend staic 경로를 잘못 지정해서 

<br><br>

# 6. 보완할 점
- count(spear - shield) 속도?
- 로그인 후 활동이 없으면 1시간 뒤에 자동 로그아웃하는 기능
- celery task test code 작성
- Elasticsearch
- react 시간표시 timesince로 해서 몇 분 전 구현
- comment 보낼 때 parent 있는 comment 는 reply로 뒤에 붙이기만 해야하는데.. -> comments.filter(comment => comment.reply.parent === comment.id)해서 comment를 다시 useState해주면 되는데 comment.reply 가 재귀로 들어가 있어서 parent 값이 안불러와짐 --> 구조 바꾸기
- S3 사용 해보기
- API 문서화
- nginx.conf 다시 정의?
- version1의 레벨링, 아이템 구매기능 추가
