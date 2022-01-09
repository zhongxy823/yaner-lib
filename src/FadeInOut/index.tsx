import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import './index.less';

interface IProps {
  /**
   * @description       子元素集合
   * @default           -
   */
  items?: React.ReactNode[];
  /**
   * @description       一个子元素的滚动速度（单位s）
   * @default           2
   */
  duration?: number;

  /**
   * @description       鼠标经过停止
   * @default           false
   */
  hoverStop?: boolean;

  /**
   * @description       样式
   * @default           -
   */
  style?: React.CSSProperties;

  /**
   * @description       类名
   * @default           -
   */
  className?: string;
}

const InfoList: React.FC<IProps> = props => {
  const { items = [], className, duration = 2, hoverStop = false } = props;
  const [loading, setLoading] = useState(true);
  // 动态生成keyFrames
  const insertStyleSheetRule = (ruleText: string) => {
    const sheets = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    // 要动态生成不同的anmation,所以要把前面创建的相同anmation给删了
    const reg = /(?<=@keyframes\s+?)(.+?)(?=\s+?{)/;
    const match = ruleText.match(reg);
    const name = match ? match[0] : null;
    let ss: number | null = null;
    let st: number | null = null;
    if (name) {
      // eslint-disable-next-line guard-for-in
      for (const i in sheets) {
        for (const k in sheets[i].rules) {
          // @ts-ignore
          if (sheets[i].rules[k].name === name) {
            ss = parseInt(i);
            st = parseInt(k); // 每次只传一个属性，所有表里只能有一个同名
          }
        }
      }
      if (ss !== null && st !== null) {
        sheets[ss].deleteRule(st);
      }
    }
    const sheet = sheets[ss || sheets.length - 1] as CSSStyleSheet;
    sheet.insertRule(
      ruleText,
      sheet.rules ? sheet.rules.length : sheet.cssRules.length,
    );
    console.log(sheet);
  };
  useEffect(() => {
    if (items) {
      const len = items.length;
      for (let i = 1; i <= len; i++) {
        insertStyleSheetRule(`@keyframes fadeInOut${i} {
          0%, ${(100 / len) * (i - 0.6)}% { opacity: 1; } 
          ${i === len ? '' : `${(100 / len) * i}%, `}100% { opacity: 0; } 
        }`);
      }
      setLoading(false);
    }
  }, [items]);
  return (
    <div
      className={classnames('c-fade-in-out', className, { hoverStop })}
      style={props.style}
    >
      {!loading && (
        <>
          <div className={classnames('c-fade-in-out-item')}>{items[0]}</div>
          {items &&
            items.reverse().map((item, index) => (
              <div
                className="c-fade-in-out-item"
                style={{
                  animation: `fadeInOut${items.length - index} ${duration *
                    items.length}s infinite`,
                }}
                key={index}
              >
                {item}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default InfoList;
