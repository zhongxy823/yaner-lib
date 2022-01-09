import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import './index.less';

interface IComponentProps {
  /**
   * @description       唯一标识
   * @default           -
   */
  rollingKey: string;

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
   * @description       方向
   * @default           transverse
   */
  direction?: 'transverse' | 'vertical';

  /**
   * @description       显示区域显示多少子元素
   * @default           3
   */
  span?: number;

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

const IComponent: React.FC<IComponentProps> = props => {
  const warpRef = useRef<any>();
  const {
    items = [],
    className,
    duration = 2,
    hoverStop = false,
    span = 3,
    direction = 'transverse',
    rollingKey,
    // type = 'dom',
  } = props;
  const [loading, setLoading] = useState(true);
  const [itemWidth, setItemWidth] = useState<number>();
  const [itemHeight, setItemHeight] = useState<number>();
  const [list, setList] = useState<React.ReactNode[]>();
  // 动态生成keyFrames 和 计算宽度
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
    if (direction === 'transverse') {
      if (list && itemWidth && items) {
        const len = items.length;
        insertStyleSheetRule(`@keyframes seamlessRolling${rollingKey} {
          from{
            margin-left: 0px;
          }
          to{
            margin-left: -${len > span ? len * itemWidth : 0}px;
          }
        }`);
      }
    } else {
      if (list && itemHeight && items) {
        const len = items.length;
        insertStyleSheetRule(`@keyframes seamlessRolling${rollingKey} {
          from{
            margin-top: 0px;
          }
          to{
            margin-top: -${len > span ? len * itemHeight : 0}px;
          }
        }`);
      }
    }
    setLoading(false);
  }, [items, itemWidth, list, itemHeight]);
  useEffect(() => {
    setTimeout(() => {
      setItemWidth((warpRef?.current?.offsetWidth || 300) / span);
      setItemHeight((warpRef?.current?.offsetHeight || 300) / span);
    }, 100);
    setList(items.length > span ? items.concat(items.slice(0, span)) : items);
    window.addEventListener('resize', () => {
      setItemWidth((warpRef?.current?.offsetWidth || 300) / span);
      setItemHeight((warpRef?.current?.offsetHeight || 300) / span);
    });
  }, []);
  return (
    <div
      className={classnames('c-seamless-rolling-content', className)}
      style={props.style}
    >
      <div
        ref={warpRef}
        className={classnames('c-seamless-rolling', {
          hoverStop,
          noRolling: items.length <= span,
          'c-seamless-rolling--transverse': direction === 'transverse',
          'c-seamless-rolling--vertical': direction === 'vertical',
        })}
      >
        {!loading && itemWidth && itemHeight && list && rollingKey && (
          <div
            className="c-seamless-rolling-warp"
            style={{
              animationDuration: `${duration * list?.length}s`,
              animationName: `seamlessRolling${rollingKey}`,
              width:
                direction === 'transverse'
                  ? `${(list?.length || 0) * itemWidth}px`
                  : '100%',
              height:
                direction === 'vertical'
                  ? `${(list?.length || 0) * itemHeight}px`
                  : '100%',
            }}
          >
            {list &&
              list.map((item, index) => (
                <div
                  className={classnames('c-seamless-rolling-item', {
                    'c-seamless-rolling-item--transverse':
                      direction === 'transverse',
                    'c-seamless-rolling-item--vertical':
                      direction === 'vertical',
                  })}
                  key={index}
                  style={{
                    width:
                      direction === 'transverse'
                        ? `${itemWidth - 12}px`
                        : '100%',
                    height:
                      direction === 'vertical'
                        ? `${itemHeight - 12}px`
                        : '100%',
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IComponent;
