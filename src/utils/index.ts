const toRGB = function toRGB(val: string, opacity?: string | number) {
  var reg1 = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i; // i不区分大小写

  var reg2 = /^#([0-9A-F])([0-9A-F])([0-9A-F])$/i;
  var reg3 = /[0-9A-F]{2}/g; // 发现第一个匹配项即停止

  var m;

  if (reg2.test(val)) {
    val = val.replace(reg2, '#$1$1$2$2$3$3');
  } else if (reg1.test(val)) {
    m = val.match(reg3) || [];
    //@ts-ignore
    val = 'rgb('
      .concat(
        [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)].join(','),
        ',',
      )
      .concat(opacity === undefined ? 1 : opacity, ')');
  }

  return val;
};

const getRankingColor = function getRankingColor(ranking: number) {
  if (ranking === 1) {
    return '#048BFF';
  } else if (ranking === 2) {
    return '#EBB657';
  } else if (ranking === 3) {
    return '#4AA562';
  } else {
    return '#0049AC';
  }
};

export { toRGB, getRankingColor };
