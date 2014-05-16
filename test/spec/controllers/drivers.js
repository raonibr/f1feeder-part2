describe('Controller: driversController', function () {

  // First, we load the app's module
  beforeEach(module('F1FeederApp'));

  // Then we create some variables we're going to use
  var driversController, scope;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {

    // Here, we create a mock scope variable, to replace the actual $scope variable the controller would take as parameter
    scope = $rootScope.$new();

    // Then we create an $httpBackend instance. I'll talk about it below.
    httpMock = $httpBackend;

    // Here, we set the httpBackend standard reponse to the URL the controller is supposed to retrieve from the API
    httpMock.expectJSONP("http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK").respond(
      {"MRData": {"StandingsTable": {"StandingsLists" : [{"DriverStandings":[
        {
          "Driver": {
              "givenName": 'Sebastian',
              "familyName": 'Vettel'
          },
          "points": "397",
          "nationality": "German",
          "Constructors": [
              {"name": "Red Bull"}
          ]
        },
        {
          "Driver": {
              "givenName": 'Fernando',
              "familyName": 'Alonso'
          },
          "points": "242",
          "nationality": "Spanish",
          "Constructors": [
              {"name": "Ferrari"}
          ]
        },
        {
          "Driver": {
              "givenName": 'Mark',
              "familyName": 'Webber'
          },
          "points": "199",
          "nationality": "Australian",
          "Constructors": [
              {"name": "Red Bull"}
          ]
        }
      ]}]}}}
    );

    // Here, we actually initialize our controller, passing our new mock scope as parameter
    driversController = $controller('driversController', {
      $scope: scope
    });

    // Then we flush the httpBackend to resolve the fake http call
    httpMock.flush();

  }));


  // Now, for the actual test, let's check if the driversList is actually retrieving the mock driver array
  it('should return a list with three drivers', function () {
    expect(scope.driversList.length).toBe(3);
  });

  // Let's also make a second test checking if the drivers attributes match against the expected values
  it('should retrieve the family names of the drivers', function () {
    expect(scope.driversList[0].Driver.familyName).toBe("Vettel");
    expect(scope.driversList[1].Driver.familyName).toBe("Alonso");
    expect(scope.driversList[2].Driver.familyName).toBe("Webber");
  });

});