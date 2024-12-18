
## 프로젝트 개요

이 프로젝트는 Netflix의 UI와 기능을 클론한 웹 애플리케이션입니다. React를 사용하여 개발되었으며, 사용자 인터페이스는 Netflix와 유사하게 구성되었습니다. 
이 프로젝트는 학습 목적으로 만들어졌습니다. 그리고 배포는 netlify를 사용하여 배포하였습니다.

## 기능
- **로그인**: 카카오 로그인 사용
- **홈 화면**: 배너에 인기 영화 포스터와 제목, 상세 설명 표시 및 재생, 상세 설명 버튼 사용, 
             배너 밑으론 인기 영화 및 다양한 TV 프로그램 목록 표시,
             포스터를 누르면 하트 표시가 나오면서 위시리스트에 해당 영화 저장
- **인기작**: 그리드 뷰와 리스트 뷰로 인기있는 영화 순서대로 표시, 
            그리드 뷰는 스크롤 차단 후 페이지네이션 기능을 사용하여 버튼을 눌러 다양한 영화 확인 가능,
            리스트 뷰는 무한 스크롤 기능 사용, top 버튼을 누르면 맨 위로 올라가는 기능 사용,
            포스터를 누르면 하트 표시가 나오면서 위시리스트에 해당 영화 저장
- **검색 기능**: 영화 및 TV 프로그램 검색, 포스터를 누르면 상세정보 및 트레일러 확인 가능,
               영화 제목으로 검색하면 최신 검색 기록에 저장, 
               장르, 평점, 언어, 다양한 정렬 기준에 따라 영화 정렬 가능, 
               초기화 버튼을 누르면 기본 값인 인기영화 목록으로 정렬
- **상세 페이지**: 각 영화 및 TV 프로그램에 대한 세부 정보 및 트레일러 제공
- **위시리스트**: 홈 화면과 인기작에서 저장한 포스터들이 표시
- **반응형 디자인**: 다양한 디바이스에서 최적화된 UI 제공

## 홈페이지

Joo Movie [https://joomovie.netlify.app/](https://joomovie.netlify.app//)

## 기술 스택

- **프론트엔드**: React, JavaScript, HTML, CSS
- **상태 관리**: React Hooks (useState, useEffect)
- **스타일링**:  CSS 사용
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api) (영화 데이터 제공)
- **로그인**: 카카오 로그인 사용
- **배포**: Netlify 

## 설치 방법

로컬 환경에서 이 프로젝트를 실행하려면 다음 단계를 따르세요:

1. 리포지토리를 클론합니다:
   ```bash
   git clone https://github.com/wldnek03/server.git
   
2. 프로젝트 디렉토리로 이동합니다
   ```bash
   cd <파일 이름>
 
3. 필요한 패키지를 설치합니다
   ```bash
   npm install 

4. 애플리케이션을 실행합니다
    ```bash
   npm start