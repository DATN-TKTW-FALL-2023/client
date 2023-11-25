export function expoleCode(chuoi : any) {
    var maGDIndex = chuoi.indexOf('GD:');
    return maGDIndex !== -1 ? chuoi.substring(maGDIndex + 3) : null;
}