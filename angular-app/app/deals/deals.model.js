(function(angular){
    'use strict';

    angular
        .module('app.services')
        .service('DealsModel', dealsModel);

    dealsModel.$inject = [
        'DealRest',
        'EventRest',
        'loading',
        '$q'
    ];

    function dealsModel(DealRest, EventRest, loading, $q){
        this.loading = loading.new();
        this.dealListing = deals;

        function deals(e_key){
          var self = this;
          var call1 = DealRest.get(e_key)
          .success(function(d){
            console.log(d);
            self.showDeals = d.tickets || [];
          });

          var call2 = EventRest.get_details(e_key)
            .success(function(d){
                self.details = d.events || [];
                console.log(self.details);
            });

          self.loading
            .watch($q.all([call1,call2]));
        }

    }

})(window.angular);
