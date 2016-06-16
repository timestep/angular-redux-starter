import R from 'ramda';
import React from 'react';

export default class MultiColumnTable extends React.Component {

  render() {
    const {
      id,
      list,
      numberOfColumns,
      renderColumnItem
    } = this.props;

    const colClassName = 'col-sm-' + (12 / numberOfColumns);
    const itemsPerCol = Math.ceil(list.length / numberOfColumns);
    const content = R.pipe(
      R.foldlIndexed((acc, item, index) => {
        const group = Math.floor(index / itemsPerCol);
        acc[group] = acc[group] || [];
        acc[group].push(renderColumnItem(item));
        return acc;
      }, []),
      R.mapIndexed((children, index)=> {
        return (
          <div
              className={colClassName}
              key={id + '-column-' + index}
          >
            {children}
          </div>
        );
      })
    )(list);

    return (
      <div className={'container-fluid'}>
        <div className={'row'}>
          {content}
        </div>
      </div>
    );
  }
}
