/* 
  E-뮤지엄 말뭉치 형태 예상 (Tokenize 말뭉치는 이미 있다고 가정)
    input: 토큰 목록
    labels: 라벨링 결과 목록 (토큰 번호, 속성 등)
  예시
    예시 유물: 청자
    예시 url: http://www.emuseum.go.kr/detail?cateClass=&cateListFlag=&keyword=%EC%B2%AD%EC%9E%90&pageNum=10&rows=20&sort=&highQualityYn=&isImgExistOp=&mckoglsvOp=&isIntrstMuseumOp=&filedOp=&detailFlag=&dq=&ps01Lv1=&ps01Lv2=&ps01Lv3=&mcSeqNo=&author=&ps06Lv1=&ps06Lv2=&ps08Lv1=&ps08Lv2=&ps09Lv1=&ps09Lv2=&ps09Lv3=&ps09Lv4=&gl05Lv1=&gl05Lv2=&ps12Lv1=&ps15Lv1=&culturalHerNo=&publicType=&detailedDes=&thema=&storySeq=&categoryLv=&categoryCode=&mobileFacetIng=&location=&facet1Lv1=&facet1Lv2=&facet2Lv1=&facet3Lv1=&facet3Lv2=&facet4Lv1=&facet4Lv2=&facet5Lv1=&facet5Lv2=&facet5Lv3=&facet5Lv4=&facet6Lv1=&facet6Lv2=&facet7Lv1Selected=&facet7Lv1=&facet8Lv1=&keywordHistory=%EC%B2%AD%EC%9E%90&showSearchOption=&intrstMuseumCode=&returnUrl=%2FheaderSearch&selectMakerGroup=0&radioSearchCheck=unifiedSearch&headerPs01Lv1=&headerPs01Lv2=&headerPs01Lv3=
    예시 문장: 접시 저부편으로 소성상태가 양호한 상태이며, 빙렬이 확인된다.
    예시 속성: 구분 / 소성상태 / 표면상태
    input: 접시 / 저부 / 편 / 으로 / 소성 / 상태 / 가 / 양호 / 한 / 상태 / 이 / 며 / 빙렬 / 이 / 확인 / 된 / 다 / .
    labels: [
      {
        token: "접시", index: 0, attr: "구분"
      }, {
        token: "저부", index: 1, attr: "구분"
      }, {
        token: "편", index: 2, attr: "구분"
      }, {
        token: "양호", index: 7, attr: "소성상태"
      }, {
        token: "빙렬", index: 12, attr: "표면상태"
      }
    ]
*/
import { useState, useEffect } from 'react';
import './App.css';
import Annotator from './Components/Annotator';

function App() {
  // 예시 속성
  const [attributes, setAttributes] = useState([]);
  // 예시 토큰
  const [tokens, setTokens] = useState([]);
  // 예시 레이블
  const [labels, setLabels] = useState([]);

  // 초기화
  useEffect(() => {
    setAttributes([
      {
        attr: "구분", color: "#eeee77"
      }, {
        attr: "소성상태", color: "#ee99ee"
      }, {
        attr: "표면상태", color: "#99eeee"
      }, {
        attr: "굽", color: "#ee9999"
      }, {
        attr: "접지면", color: "#99ee99"
      }, {
        attr: "색조", color: "#9999ee"
      }, {
        attr: "유색", color: "#44dddd"
      }, {
        attr: "취소", color: "#aaaaaa"
      }
    ]);
    setTokens(["접시", "저부", "편", "으로", "소성", "상태", "가", "양호", "한", "상태", "이", "며", "빙렬", "이", "확인", "된", "다", ".", "수직굽", "이", "며", "접지", "면", "은", "둥글", "게", "처리", "하", "였", "다", ".", "담녹색조", "의", "유색", "을", "띤", "다", "."]);
    setLabels([
      {
        token: "접시", index: 0, attr: "구분"
      }, {
        token: "저부", index: 1, attr: "구분"
      }, {
        token: "편", index: 2, attr: "구분"
      }, {
        token: "양호", index: 7, attr: "소성상태"
      }, {
        token: "빙렬", index: 12, attr: "표면상태"
      }
    ]);
  }, [])

  return (
    <div className="app_container">
      <Annotator 
        attributes={attributes}
        tokens={tokens}
        labels={labels}
      />
    </div>
  );
}

export default App;
