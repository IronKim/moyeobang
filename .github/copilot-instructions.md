# Copilot Instructions for moyeobang

## Frontend 스타일 규칙 (front-end/src)

### 스택 유지

- React 18 + CRA 구조를 유지한다.
- UI는 styled-components와 AntD를 기본으로 사용한다.
- 기존에 사용 중인 motion, MUI 훅, react-kakao-maps-sdk 패턴을 따른다.

### 컴포넌트 작성

- 함수형 컴포넌트 + 훅(useState, useEffect, useMediaQuery)을 사용한다.
- 스타일 선언은 파일 상단의 styled 컴포넌트 블록에 모아둔다.
- 스타일 값은 하드코딩보다 CSS 변수(var(--...))를 우선 사용한다.
- 입력 폼은 AntD Form 규칙(name, rules, Form.List)을 일관되게 사용한다.

### 상태/이벤트 처리

- 입력 처리 함수(onInput 등)는 현재 방식과 동일하게 유지한다.
- 값 표시와 저장이 다를 경우(getValueFromEvent, getValueProps)처럼 분리해서 처리한다.
- 유효성은 UI 제한(maxLength) + rules 검증을 함께 둔다.

### 레이아웃/반응형

- 브레이크포인트는 기존 기준(max-width: 1200px)을 우선 사용한다.
- 데스크톱/모바일 차이는 조건부 스타일 또는 훅으로 명확히 분기한다.
- 큰 구조 변경보다 grid/flex 비율, gap, width 조정으로 개선한다.

### 파일/유틸 구조

- 반복되는 포맷/정규화 로직은 utils로 분리한다.
- 범용 유틸 파일은 기능 단위 네임스페이스 객체로 export 한다.
  - 예: phone.normalize, phone.format

## Backend 스타일 규칙 (src/main/java)

### 기본 구조

- Controller -> Service -> Repository 계층을 유지한다.
- 요청/응답은 request/response DTO를 사용한다.
- 응답 래핑은 기존 Response.success 패턴을 따른다.

### 컨트롤러 규칙

- URL prefix는 /api/v1/{domain} 형식을 유지한다.
- 입력 검증은 @Valid를 우선 사용한다.
- 컨트롤러는 얇게 유지하고 비즈니스 로직은 Service로 이동한다.

### Java 코드 스타일

- Lombok(@RequiredArgsConstructor) 사용 패턴을 유지한다.
- 메서드/변수명은 현재 도메인 명명 규칙을 따른다.
- 변경 시 기존 예외/응답 형태와 호환되게 작성한다.

## 작업 방식 규칙

- 새 라이브러리 도입은 기존 스택으로 해결 불가능한 경우에만 제안한다.
- 라이브러리 도입 시 이유, 영향 범위, 대체안까지 함께 제시한다.
- 변경 후에는 최소한 해당 파일의 에러를 확인한다.

## 금지/주의 사항

- 기존 API 스펙(경로, 필드명, 응답 형태)을 임의로 바꾸지 않는다.
- 스타일 전면 교체(예: styled-components -> 다른 체계)는 요청 없이는 하지 않는다.
- 사용자 작업 중인 파일의 무관한 코드 정리는 하지 않는다.
