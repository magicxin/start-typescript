function makeData(res: any): any {
  const result: any = [];
  res.forEach((item: any) => {
    result.push({
      who: item.orgName,
      phoneNumber: item.telNumber,
      name: item.userName,
    });
  });
  return result;
}

export {
  makeData,
};
