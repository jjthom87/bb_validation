var sellersWhoPostReplicas = ["beaniebabesnc"]

exports.splitRecords = function(items){
  const noAdditionalPictures = items.filter(item => !item.additionalImages);
  const additionalPictures = items.filter(item => item.additionalImages);
  return {valid: additionalPictures, invalid: noAdditionalPictures}
}
