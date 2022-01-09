import React from 'react';
import classnames from 'classnames';
import './index.less';
import { Image } from 'antd';

interface FieldNamesProps {
  url: string;
  title: string;
  id: number;
  subtitle?: string;
  tag?: string;
  tagColor?: string;
}

interface IComponentProps {
  /**
   * @description       自定义节点 id、url、title、subtitle、tag、tagColor 的字段
   * @default           {url: 'photoUrl', title: 'personName', subtitle: 'subtitle', tag: 'attendance', tagColor: 'color', id: 'personId'}
   */
  fieldNames?: FieldNamesProps;
  /**
   * @description       值
   * @default           -
   */
  info?: object;
  /**
   * @description       点击事件，会将id传出去
   * @default           -
   */
  onClick?: (id?: number) => void;
  /**
   * @description       类名
   * @default           -
   */
  className?: string;
  /**
   * @description       样式
   * @default           -
   */
  style?: React.CSSProperties;
}

const IComponent: React.FC<IComponentProps> = ({
  fieldNames = {
    url: 'photoUrl',
    title: 'personName',
    subtitle: 'subtitle',
    tag: 'attendance',
    tagColor: 'color',
    id: 'personId',
  },
  info,
  className,
  style,
  onClick,
}) => {
  const _info = {
    photoUrl:
      'https://fe-cloud.uni-ubi.com/image/1641537068015-default-image.png?x-oss-process=img/q/80',
    personName: '--',
  };
  const currentInfo = info || _info;
  const handleClick = () => {
    onClick && onClick(currentInfo[fieldNames.id]);
  };
  return (
    <div
      className={classnames('c-album-card', className, {
        'c-album-card--disabled': !info,
      })}
      style={{ ...style }}
      onClick={handleClick}
    >
      <Image
        className="c-album-card-img"
        src={currentInfo[fieldNames.url]}
        preview={onClick ? false : { className: 'c-album-card-img-preview' }}
      />
      <div className="c-album-card-info">
        <div className="c-album-card-title">
          {currentInfo[fieldNames.title]}
        </div>
        {currentInfo[fieldNames?.subtitle || 'subtitle'] && (
          <div className="c-album-card-subtitle">
            {currentInfo[fieldNames.subtitle || 'subtitle']}
          </div>
        )}
      </div>
      {currentInfo[fieldNames?.tag || 'tag'] && (
        <div
          style={{
            background:
              currentInfo[fieldNames.tagColor || 'tagColor'] || '#00AE4C',
          }}
          className="c-album-card-tag"
        >
          {currentInfo[fieldNames?.tag || 'tag']}
        </div>
      )}
    </div>
  );
};

export default IComponent;
