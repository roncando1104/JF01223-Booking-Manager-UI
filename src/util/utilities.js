import {toast} from "react-toastify";

export function formatDate(date) {
  const options = {day: '2-digit', month: 'short', year: 'numeric'};
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const [month, day, year] = formattedDate.split(' ');
  const monthName = month.toProperCase();

  return `${monthName} ${day} ${year}`;
}

export function formatRole(role) {
  return role === 'AE' ? 'Apprentice Elder' : role === '' || role === undefined ? '' :  role.replace('_', ' ').toProperCase()
}

export function formatPhoneNumber(str) {
  return  str.length === 11 ? "(+63)" + str.substring(1, 4)
      + "-" + str.substring(4, 7) + "-"
      + str.substring(
          7, 11) : str;
}

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() + ".";});
};