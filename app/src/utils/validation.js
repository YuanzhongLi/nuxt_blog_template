export const isValidPositiveInteger = (value) => {
  const trimedValue = value.trim();
  const numValue = Number(trimedValue);
  return (
    Number.isInteger(numValue) // 整数
    && numValue >= 0 // 正の数
    && String(numValue) === trimedValue
  ); // もとの値が'01'などではない
};

export const isValidPositiveNumber = (value) => {
  const numValue = Number(value);

  return (
    numValue >= 0 // 正の数
  );
};

export const isValidEmail = email => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  email,
);


// 電話番号は数字(半角)・ハイフン(半角)のみと10,11桁
export const isValidPhoneNumber = (phoneNumber) => {
  // ハイフンを取り除いてから半角数字のみをチェック
  const rejectHyphenPhoneNumber = phoneNumber.replace(/-/g, '');
  return (/^([0-9]{10,11})$/.test(rejectHyphenPhoneNumber));
};

// 半角英字(小文字)もしくは半角数字のみ
export const isValidAdminName = name => name.match(/^[0-9a-z]+$/);


// 半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列
export const isValidPassword = password => /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i.test(password);

export const isEmpty = (val) => {
  if (val instanceof Array) {
    if (val.length > 0) return false;
    return true;
  }
  if (val) return false;
  if (val === 0 || val === false) return false;
  return true;
};

// 空白文字のみではないことを確認
export const isValidMessage = message => !/^[ 　\s]*$/.test(message);
