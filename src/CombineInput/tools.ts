import { CombineValue } from './interface';

export const getReallyMultiple = (value: CombineValue) => {
  return value // 如果 value 存在
    ? value.single && value.multiple // 并且里面的值都存在
      ? [...value.multiple, value.single] // 将 value 的值整合
      : value.multiple || [] // 否则 结果只等于 value.multiple
    : []; // 兜底
};
