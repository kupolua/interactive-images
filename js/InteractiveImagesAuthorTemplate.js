function InteractiveImagesAuthorTemplate() {     return {         getTemplate: function () {             return interactiveImagesAuthorTemplate;         }     } }; var interactiveImagesAuthorTemplate = '{"initialImageId":"eae5a21facf34818855397eba0567c57","images":[{"title":"DNS server check servers active group state","key":"eae5a21facf34818855397eba0567c57","value":{"imageName":"dns initial state","isBase64":false,"imageSrc":"img/dns_initial_state.png"}},{"title":"all in active group healthy","key":"42fd652c010d44398f50bb7b58d60bb6","value":{"imageName":"all in active group healthy","isBase64":false,"imageSrc":"img/active_healthy.png"}},{"title":"some in active group healthy","key":"2da40be55b644a91adc9ae08a32abf71","value":{"imageName":"some in active group healthy","isBase64":false,"imageSrc":"img/active_some_not_healthy.png"}},{"title":"active group unhealthy","key":"523e32dc43344eb79c0292705bc0d940","value":{"imageName":"active group unhealthy","isBase64":false,"imageSrc":"img/active_group_unhealthy.png"}}],"transitions":[{"imageId":"eae5a21facf34818855397eba0567c57","transitionName":"choose current DNS active group state","proposition":{"type":"FIXED_CHOICE","values":["all in active group healthy","some in active group healthy","active group unhealthy"]},"conditions":[{"predicate":"function(value){return value==\'all in active group healthy\';}","targetImageId":"42fd652c010d44398f50bb7b58d60bb6"},{"predicate":"function(value){return value==\'some in active group healthy\';}","targetImageId":"2da40be55b644a91adc9ae08a32abf71"},{"predicate":"function(value){return value==\'active group unhealthy\';}","targetImageId":"523e32dc43344eb79c0292705bc0d940"}]}]}';
