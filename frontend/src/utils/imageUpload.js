export function imageUpload(files) {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0) return resolve([]);
    const results = [];
    const reader = new FileReader();
    reader.onload = (e) => results.push(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(files[0]);
    resolve(results);
  });
}
