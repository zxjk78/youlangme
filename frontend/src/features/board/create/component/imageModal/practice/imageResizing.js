import React, { useEffect, useRef } from 'react';

const Example = () => {
  const canvasRef = useRef();
  const imgRef = useRef();

  // canvas에 그리는 작업을 하는 함수를 선언
  const drawCanvas = function () {
    // 이미지 객체
    const image = new Image();
    //useRef값 가지고오기때문에 위의 매개변수 필요없음
    // 캔버스 태그 - 캔버스 객체의 값
    const canvas = canvasRef.current;
    // 있으면 캔버스 객체 하고 없으면 undefined
    // 캔버스는 처음에 비어있습니다. 무언가를 표시하기 위해서,
    // 어떤 스크립트가 랜더링 컨텍스트에 접근하여 그리도록 할 필요가 있습니다.
    // <canvas> 요소는 getContext() 메서드를 이용해서, 랜더링 컨텍스트와 (렌더링 컨텍스트의) 그리기 함수들을 사용할 수 있습니다.
    const ctx = canvas?.getContext('2d');
    // 해서 있으면 if문 돌림
    if (ctx) {
      // 용량조절 위해 wid hei 고정
      canvas.width = 360;
      canvas.height = 540;
      canvas.backgroundColor = 'rgb(255, 255, 255)';

      image.src =
        'https://user-images.githubusercontent.com/71132893/109293741-91567f00-786f-11eb-88ff-4204af9d0bdb.jpg';
      // 이미지 객체가 로드됬을 때 그리기 함수들을 사용하여 이미지를 그림
      image.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, 360, 540);
      };
      // 캔버스 객체를 blob으로 바꾸고, imgRef의 소스를 파일리더가 읽은 것으로 바꿈
      canvas.toBlob(function (blob) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imgRef.current.src = reader.result;
        };
        reader.readAsDataURL(blob);
      });
    } else {
      throw new Error('Could not get context');
    }
  };
  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <>
      <img ref={imgRef} alt={`이미지 리사이징`}></img>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Example;
