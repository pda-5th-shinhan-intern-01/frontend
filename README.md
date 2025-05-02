## 깃헙 규칙

1. 업무별로 이슈 생성하기
2. 이슈 별로 branch 만들기 (ex. MainPage-UI)
3. 커밋 메시지 (feat, fix, style, merge...)(#이슈번호): 커밋메세지
   <br/>ex) feat(#1): 주식 차트 생성
4. pull request 시, 최소 두 명 reviewer 설정 및 확인 후 merge하기
5. main 브랜치 X, develop 브랜치에 merge하기기

## 폴더 구조

```
frontend
├─ public            # 정적 파일(이미지, 파비콘 등) 저장 폴더
├─ src               # 실제 소스 코드 루트
│  ├─ api            # API 호출 관련 모듈
│  ├─ assets         # 이미지, 아이콘 등 정적 자산
│  ├─ components     # 재사용 가능한 전역 컴포넌트
│  │  ├─ layout      # Header, Footer 등 레이아웃 구성 요소
│  ├─ data           # 서비스/지표 소개 등 정적인 텍스트 데이터
│  ├─ hooks          # 커스텀 React 훅
│  ├─ pages          # 각 라우트별 페이지 컴포넌트
│  │  ├─ MainPage    # 홈 대시보드 페이지
│  │  │  ├─ components # 메인 페이지 전용 UI 컴포넌트
│  │  │  ├─ dummies    # 메인 전용 더미 데이터
│  ├─ routes         # 라우터 설정
│  └─ utils          # 공통 유틸리티 함수
```
