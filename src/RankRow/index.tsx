import classnames from 'classnames';
import React from 'react';

import { getRankingColor, toRGB } from '../utils';

import './index.less';

export interface IComponentProps {
  /**
   * @description       排名
   */
  ranking?: number;
  /**
   * @description       标题
   */
  title?: string;
  /**
   * @description       value
   */
  value?: React.ReactNode;
  /**
   * @description       类名
   */
  className?: string;
  /**
   * @description       样式
   */
  style?: React.CSSProperties;
  /**
   * @description       大小（可选： small、large）
   * @default           small
   */
  size?: 'small' | 'large';
  /**
   * @description       百分比
   */
  percent?: number;
  /**
   * @description       进度条的色彩
   * @default           #048BFF
   */
  strokeColor?: string;
  /**
   * @description       未完成的分段的颜色
   * @default           rgba(255,255,255,0.1)
   */
  trailColor?: string;
}

const IComponent: React.FC<IComponentProps> = ({
  strokeColor = '#048BFF',
  trailColor = 'rgba(255,255,255,0.1)',
  ranking,
  value,
  title,
  className,
  style,
  percent = 0,
  size = 'small',
}) => {
  return (
    <div className={classnames('c-rank-row', className)} style={{ ...style }}>
      {title && (
        <div className="c-rank-row-title">
          <div>
            {ranking && (
              <div
                className="c-rank-row-title-ranking"
                style={{
                  borderColor: getRankingColor(ranking),
                  background: toRGB(getRankingColor(ranking), 0.15),
                }}
              >
                {ranking}
              </div>
            )}
            <div className="c-rank-row-title-label">{title}</div>
          </div>
          <div className="c-rank-row-value">{value || '--'}</div>
        </div>
      )}
      <div
        className={classnames('c-rank-row-percent', {
          'c-rank-row-percent--small': size === 'small',
          'c-rank-row-percent--large': size === 'large',
        })}
        style={{
          background: `linear-gradient(to right, ${
            ranking ? getRankingColor(ranking) : strokeColor
          } 0%, ${
            ranking ? getRankingColor(ranking) : strokeColor
          } ${percent}%, ${trailColor} ${percent}%, ${trailColor} 100%)`,
        }}
      />
    </div>
  );
};

export default IComponent;
