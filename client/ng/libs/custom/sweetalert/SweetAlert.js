/**
@fileOverview

@toc

*/

(function (root, factory) {
	"use strict";

	/*global define*/
	if (typeof define === 'function' && define.amd) {
		define(['angular', 'sweetalert'], factory); // AMD
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('angular'), require('sweetalert')); // Node
	} else {
		factory(root.angular, root.swal); // Browser
	}

}(this, function (angular, swal) {
	"use strict";

	angular.module('oitozero.ngSweetAlert', [])
		.factory('SweetAlert', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
			//public methods
			var self = {

				swal: function (arg1, arg2, arg3) {

					$rootScope.$evalAsync(function () {
						$timeout(function () {
							if (typeof (arg2) === 'function') {
								swal(arg1, function (isConfirm) {
									$rootScope.$evalAsync(function () {
										arg2(isConfirm);
									});
								}, arg3);
							} else {
								swal(arg1, arg2, arg3);
							}
						}, 100);
					});

				},
				success: function (title, message) {
					$rootScope.$evalAsync(function () {
						swal(title, message, 'success');
					});
				},
				error: function (title, message) {
					$rootScope.$evalAsync(function () {
						swal(title, message, 'error');
					});
				},
				warning: function (title, message) {
					$rootScope.$evalAsync(function () {
						swal(title, message, 'warning');
					});
				},
				info: function (title, message) {
					$rootScope.$evalAsync(function () {
						swal(title, message, 'info');
					});
				},
				showInputError: function (message) {
					$rootScope.$evalAsync(function () {
						swal.showInputError(message);
					});
				},
				close: function () {
					$rootScope.$evalAsync(function () {
						swal.close();
					});
				},
				confirm: function (title, message) {
					swal({
							title: title,
							text: message,
							type: "warning",
							showCancelButton: true,
							confirmButtonColor: '#DD6B55',
							confirmButtonText: 'Ok',
							cancelButtonText: "Cancel",
							closeOnConfirm: true,
							closeOnCancel: true
						},
						function (isConfirm) {
							return isConfirm;
						});
				}
			};

			return self;
		}]);
}));