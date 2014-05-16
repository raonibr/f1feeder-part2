describe('Controller: driverController', function () {

  beforeEach(module('F1FeederApp'));

  var driverController, scope;

  //Don't forget we need  $routeParams this time, since we gonna use it on the controller
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $routeParams) {

    scope = $rootScope.$new();

    // Creating and initializing the mock routeparams object.
    routeParams = $routeParams;
    routeParams.id = "vettel";

    // Creating the $httpBackend instance
    httpMock = $httpBackend;

    // Here, we set the httpBackend standard reponse to the URL the controller is supposed to retrieve from the API
    httpMock.expectJSONP("http://ergast.com/api/f1/2013/drivers/vettel/driverStandings.json?callback=JSON_CALLBACK").respond(
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
        }
      ]}]}}}
    );

    httpMock.expectJSONP("http://ergast.com/api/f1/2013/drivers/vettel/results.json?callback=JSON_CALLBACK").respond(
      {"MRData": {"RaceTable": {"Races" : [
        {
          "season":"2013",
          "round":"1",
          "raceName":"Australian Grand Prix",
          "Circuit":"Albert Park"
        },
        {
          "season":"2013",
          "round":"2",
          "raceName":"Malaysian Grand Prix",
          "Circuit":"Sepang International Circuit"
        },{
          "season":"2013",
          "round":"3",
          "raceName":"Chinese Grand Prix",
          "Circuit":"Shanghai International Circuit"
        },
        {
          "season":"2013",
          "round":"4",
          "raceName":"Bahrain Grand Prix",
          "Circuit":"Bahrain International Circuit"
        }
      ]}}}
    );

    // Here, we actually initialize our controller, passing our new mock scope as parameter
    driverController = $controller('driverController', {
      $scope: scope,
      $routeParams : routeParams
    });

    // Then we flush the httpBackend to resolve the fake http call
    httpMock.flush();

  }));


  // Now let's check the driver nationality
  it('should retrieve the nationality of the driver', function () {
    expect(scope.driver.nationality).toBe("German");
  });

  //The races list
  it('should retrieve the list of races of the current year', function () {
    expect(scope.races.length).toBe(4);
  });

  // And the races atributes
  it('should retrieve the list of races of the current year', function () {
    expect(scope.races[0].raceName).toBe("Australian Grand Prix");
    expect(scope.races[1].raceName).toBe("Malaysian Grand Prix");
    expect(scope.races[2].raceName).toBe("Chinese Grand Prix");
    expect(scope.races[3].raceName).toBe("Bahrain Grand Prix");
  });

});