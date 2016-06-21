export default function dateLimit() {
  return function (items, date) {
    if (date) {
      return items.filter(function (item) {
        var selectedDate = String(date).substring(0, 15);
        var itemDate = String(new Date(item.timestamp)).substring(0, 15);
        if (selectedDate === itemDate) {
          return item;
        }
      });
    } else {
      return items;
    }
  };
};
