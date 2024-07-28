/* eslint-disable max-len */
export function dateToString(date: Date) {
  const newDate = new Date(date);
  const dateString = `${newDate.getFullYear()}.${newDate.getMonth() + 1}.${newDate.getDate()}.`;
  const timeString = `${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}:${String(newDate.getSeconds()).padStart(2, '0')}`;
  return `${dateString} ${timeString}`;
}

export function numberToPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function fileToDataUrl(file: File, dispatch: (result: string) => void) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    dispatch(reader.result as string);
  };
}

export function dataURLtoFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/);
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime ? mime[1] : '' });
}


export function isDataURL(dataUrl: unknown): dataUrl is string {
  if(typeof dataUrl !== 'string') {
    return false;
  }
  const arr = dataUrl.split(',');
  const encode = arr[0].split(';');
  if(encode[1] !== 'base64') {
    return false;
  }
  return true;
}