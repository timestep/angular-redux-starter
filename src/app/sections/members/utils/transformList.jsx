import R from 'ramda';

const transformStringToPath = (str) => str.toUpperCase().replace(/[^A-Z]/g, '_');

const transformPathToObject =
  R.curry(
    (acc, path, value) => {
      const list = path.split('.');
      let _acc = acc;
      for (let n = 0, nLen = list.length - 1; n < nLen; n++) {
        _acc[list[n]] = _acc[list[n]] || {};
        _acc = _acc[list[n]];
      }
      _acc[list[list.length - 1]] = value;
      return acc;
    }
  );

export const listReducer =
  R.curry((reducer, acc, list) => {
    const _listReducer = (_parent, _acc, _list) => {
      return R.pipe(
        R.keys,
        R.foldl((__acc, __key) => {
          const __item = _list[__key];

          __acc = reducer(_parent, __acc, __item, __key, _list);
          return _listReducer(R.last(__acc), __acc, __item);

        }, _acc)
      )(_list);
    };


    return _listReducer(null, acc, list);
  });

export const transformListToFormFieldConstants = (pathPrefix, list) =>
  listReducer(
    R.curry(
      (parent, acc, item) => {

        const _pathPrefix = parent ? parent.path : pathPrefix;

        if (item) {

          const _path = (_pathPrefix ? _pathPrefix + '.' : '') +
            transformStringToPath(item.label + (item.description ? ' ' + item.description : ''));

          // Remove children references from parent items
          if (item.list) {
            R.pipe(
              R.pickBy((val, key) => key !== 'list'),
              R.mixin({ path: _path }),
              R.mixin({category: item.label}),
              Array.prototype.push.bind(acc)
            )(item);
          } else if (item.label) {
            R.pipe(
              R.mixin({ path: _path }),
              (_item) => parent && parent.category ? R.mixin({ category: parent.category }, _item) : _item,
              (_item) => parent && parent.subcategory ? R.mixin({ subcategory: parent.subcategory }, _item) : _item,
              Array.prototype.push.bind(acc)
            )(item);
          }
        }

        return acc;
      }
    ), [], list);

export const transformConstantsToFormFields = listReducer(
  R.curry(
    (parent, acc, item) => {
      if (item &&
        R.is(Array, item)) {
        acc = R.pipe(
          R.pluck('path'),
          R.concat(acc)
        )(item);
      }
      return acc;
    }), []);

export const transformConstantsToFormFieldInitValues = listReducer(
  R.curry(
    (parent, acc, item) => {
      if (item &&
        !R.isNil(item.path) &&
        !R.isNil(item.value)) {
        acc = transformPathToObject(acc, item.path, item.value);
      }
      return acc;
    }), {});

export const transformFormFieldsToDBFields =
  R.curry(
    (formFields, formConstants) => {
      const results = R.clone(formConstants);
      return listReducer(
        R.curry(
          (parent, acc, category, key, list) => {
            if (category &&
              R.is(Array, category)) {

              list[key] = R.pipe(
                R.filter((_item) => !R.isNil(_item.id)),
                R.foldl((_acc, _item) => R.pipe(
                  R.mixin({ id: _item.id }),
                  (__item) => R.mixin(__item, { value: R.prop('value', R.path(__item.path, formFields)) || null }),
                  (__item) => __item.category ? R.mixin({ category: __item.category}, __item) : __item,
                  (__item) => __item.subcategory ? R.mixin({ subcategory: __item.subcategory}, __item) : __item,
                  Array.prototype.push.bind(_acc),
                  () => _acc
                )(_item), [])
              )(category);
            }
            return acc;
          }), results, results);
    }
  );
