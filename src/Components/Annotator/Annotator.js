import { useState, useEffect } from 'react';
import './Annotator.css';

function Annotator({attributes, tokens, labels}) {
  // 선택된 토큰 id 명단
  const [tokenIds, setTokenIds] = useState([]);
  
  // 라벨 명단 (변할 수 있음)
  const [newLabels, setNewLabels] = useState([]);

  // 초기화
  useEffect(() => {
    // 초기 라벨 설정
    setNewLabels(labels);
  }, [labels]);

  // 토큰 클릭 시 속성 설정 목록에 추가 혹은 제거
  function onclick_token(index) {
    // 해당 인덱스가 tokenIds에 있는지 확인
    const idx = tokenIds.findIndex(id => id === index);

    // 있으면 없애고 없으면 추가
    if (idx < 0) {
      // findIndex의 결과가 -1이면 없다는 것이므로 추가
      setTokenIds([index].concat(tokenIds));
    } else {
      // splice(idx, 1) 함수는 idx부터 1개의 원소를 제거하는 역할.
      tokenIds.splice(idx, 1);
      setTokenIds([].concat(tokenIds));
    }
  }

  // 속성 버튼 클릭 시 선택된 토큰의 속성 변경
  function onclick_attr(attr) {
    // 선택된 토큰 id의 기존의 라벨 제거
    const origin_labels = newLabels.filter(lbl => !tokenIds.includes(lbl.index));

    // 새로운 라벨 추가 (취소 버튼이었다면 추가할 것 없음)
    const new_labels = attr !== "취소" ? tokenIds.map(id => Object({token: tokens[id], index: id, attr: attr})) : [];

    // 두 라벨을 합한 결과 라벨 구하기
    const result_labels = origin_labels.concat(new_labels);

    // 선택된 토큰들을 모두 선택 해제
    setTokenIds([]);

    // 결과 라벨 적용
    setNewLabels(result_labels);
  }

  // 라벨에 따라 토큰을 다르게 표시하기
  function render_token(index, token) {
    // 해당 순서의 토큰이 라벨에 있는지 확인
    const idx = newLabels.findIndex(lbl => lbl.index === index && lbl.token === token);

    // 없다면 일반적인 span을 내보내고, 있다면 속성을 표시하여 반환
    if (idx < 0) {
      return (
        <span 
          key={index} 
          className="token_container"
          style={{fontWeight: tokenIds.find(id => id === index) ? "bold" : "normal"}}
          onClick={() => onclick_token(index)}>
          {token} 
        </span>
      );
    } else {
      // 해당 속성의 색을 가져온다.
      const attribute = attributes.find(attr => attr.attr === newLabels[idx].attr);
      return (
        <mark 
          key={index} 
          className="token_container" 
          style={{
            backgroundColor: attribute ? attribute.color : "#cccccc", 
            fontWeight: tokenIds.find(id => id === index) ? "bold" : "normal"
          }}
          onClick={() => onclick_token(index)}>
          {token}
          <span className="token_attr_container">{newLabels[idx].attr}</span>
        </mark>
      );
    }
  }

  // json export
  function onclick_json_export(){
    // corpus 내용 만들기 - 초기화
    var json_content = "\uFEFF";

    // corpus 내용 만들기 - 내용 구성하기
    const corpus = Object({input: tokens, labels: newLabels});

    // corpus 내용 만들기 - 구성한 내용 넣기
    json_content += JSON.stringify([corpus]);

    // json blob 만들기
    const blob = new Blob([json_content], {type: "text/json;charset=utf8"});
    
    // json 다운로드 (가상의 버튼을 만들어서 클릭하여 다운로드. 클릭 이후 다시 지우기)
    const json_url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute("style", "display:none");
    a.setAttribute("href", json_url);
    a.setAttribute("download", "demo_corpus.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // 화면에 보일 렌더링 함수
  return (
    <div className="annotator_container">
      <h1>Test Text Annotator</h1>
      <h3>Export</h3>
      <input
        className="attribute_container"
        type="button"
        value="json으로"
        onClick={onclick_json_export}
      />
      <h3>Attributes</h3>
      <div className="attributes_container">
        {attributes.map((attr, index) => (
          <input
            key={index}
            className="attribute_container"
            type="button"
            value={attr.attr}
            style={{backgroundColor: attr.color}}
            onClick={() => onclick_attr(attr.attr)}
          />
        ))}
      </div>
      <h3>Text</h3>
      <div className="tokens_container">
        {tokens.map((token, index) => render_token(index, token))}
      </div>
      <h3>Labels</h3>
      <div className="labels_container">
        {newLabels.map((lbl, index) => (
          <div key={index} className="label_container">
            <div className="label_field_container"><b>token </b>{lbl.token}</div>
            <div className="label_field_container"><b>attr </b>{lbl.attr}</div>
            <div className="label_field_container"><b>index </b>{lbl.index}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Annotator;