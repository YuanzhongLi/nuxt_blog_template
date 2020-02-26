// mailからの返信の内容を通常部分と引用部分に分ける
// 引用マークが最初に出現してから初めて消えるまでを引用部分と捉える

const formatContent = (content) => {
  const tmpArray = content.split('\n').reverse();
  const quotationArray = [];
  const normalContentArray = [];
  let quotationMarkCnt = 0;
  let isQuotationStart = false;
  let isQuotationFinish = false;

  tmpArray.forEach((el) => {
    if (el[0] === '>') {
      quotationMarkCnt += 1;
    } else if (quotationMarkCnt > 0) {
      isQuotationFinish = true;
    }

    if (quotationMarkCnt === 1) {
      isQuotationStart = true;
    }

    if (isQuotationStart && !isQuotationFinish) {
      quotationArray.unshift(`${el.substr(1)}\n`); // 引用マークを除いて追加
    } else {
      normalContentArray.unshift(`${el}\n`);
    }
  });

  // 2回連続で改行している部分は1行分の改行にまとめる
  const normalContent = normalContentArray.join('').replace('\n\n', '\n');
  const quotation = quotationArray.join('').replace('\n\n', '\n');
  const ret = {
    normalContent,
    quotation,
  };
  return ret;
};

export default formatContent;
