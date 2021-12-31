class EbaySearchResult {
  constructor(obj){
    this.itemId = obj.itemId;
    this.title = obj.title;
    this.image = obj.image;
    this.itemHref = obj.itemHref;
    this.seller = obj.seller;
    this.condition = obj.condition;
    this.conditionId = obj.conditionId;
    this.thumbnailImages = obj.thumbnailImages;
    this.shippingOptions = obj.shippingOptions;
    this.buyingOptions = obj.buyingOptions;
    this.itemWebUrl = obj.itemWebUrl;
    this.itemLocation = obj.itemLocation;
    this.categories = obj.categories;
    this.adultOnly = obj.adultOnly;
    this.legacyItemId = obj.legacyItemId;
    this.availableCoupons = obj.availableCoupons;
    this.topRatedBuyingExperience = obj.topRatedBuyingExperience;
    this.priorityListing = obj.priorityListing;
  }
}

module.exports = EbaySearchResult;
