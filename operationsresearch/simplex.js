var app = angular.module("simplex_app", [])
app.controller('simplex_ctrl', ['$scope', function ($scope) {
    $scope.stage = 'start';
    $scope.m = 2;
    $scope.n = 2;
    $scope.objective = []
    $scope.constraints = []
    $scope.inputsystem = function () {
        if ($scope.m >= 2 && $scope.n >= 2) {
            $scope.objective = new Array($scope.m);
            $scope.objective.fill(0);
            r=new Array($scope.n+1);
            r.fill(0);
            $scope.constraints=new Array($scope.m);
            $scope.constraints.fill(r);
            // for (i = 0; i < $scope.m; i++) {
            //     $scope.constraints.push([]);
            //     for (j = 0; j < $scope.n + 1; j++)
            //         $scope.constraints[i].push(0);
            // }
            $scope.stage = 'inputsystem';
        }
    };

    $scope.solve = function () {
        error = false;

        if (error) $scope.stage = 'error';
        else $scope.stage = 'solving';

    };

}]);