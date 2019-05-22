const routes = [
  {
    "path": "/jettytest11",
    "breadcrumbOptions": {
        "name": "Home",
        "href": "https://apm.activecommunities.com/jettytest11/Home"
    },
    "indexRoute": {
        "status": 404
    },
    "childRoutes": [
        {
            "path": "newcart",
            "breadcrumbOptions": {
                "name": "Shopping CartZ"
            },
            "pageHeaderOptions": {
                "title": "Shopping CartZ",
                "specificContentId": "page_newcuishoppingcart_header"
            },
            "indexRoute": {},
            "childRoutes": [
                {
                    "path": "checkout",
                    "breadcrumbOptions": {
                        "name": "Check Out"
                    },
                    "pageHeaderOptions": {
                        "title": {
                            "id": "app.route.newcart.checkout",
                            "defaultMessage": "Check Out"
                        },
                        "specificContentId": "page_newcuicheckout_header"
                    },
                    "indexRoute": {},
                    "childRoutes": [
                        {
                            "path": "confirmation",
                            "breadcrumbOptions": {
                                "name": "Confirmation",
                                "hideIndex": [
                                    1,
                                    2
                                ]
                            },
                            "pageHeaderOptions": {
                                "title": {
                                    "id": "app.route.newcart.checkout.confirmation",
                                    "defaultMessage": "Confirmation page"
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            "path": "reload",
            "childRoutes": [
                {
                    "path": ":siteIds"
                }
            ]
        },
        {
            "path": "configuration",
            "childRoutes": [
                {
                    "path": ":siteIds"
                }
            ]
        },
        {
            "path": "*",
            "status": 404
        }
    ]
  },

  {
    "path": "newcart",
    "breadcrumbOptions": {
        "name": "Shopping CartZ"
    },
    "pageHeaderOptions": {
        "title": "Shopping CartZ",
        "specificContentId": "page_newcuishoppingcart_header"
    },
    "indexRoute": {},
    "childRoutes": [
        {
            "path": "checkout",
            "breadcrumbOptions": {
                "name": "Check Out"
            },
            "pageHeaderOptions": {
                "title": {
                    "id": "app.route.newcart.checkout",
                    "defaultMessage": "Check Out"
                },
                "specificContentId": "page_newcuicheckout_header"
            },
            "indexRoute": {},
            "childRoutes": [
                {
                    "path": "confirmation",
                    "breadcrumbOptions": {
                        "name": "Confirmation",
                        "hideIndex": [
                            1,
                            2
                        ]
                    },
                    "pageHeaderOptions": {
                        "title": {
                            "id": "app.route.newcart.checkout.confirmation",
                            "defaultMessage": "Confirmation page"
                        }
                    }
                }
            ]
        }
    ]
  },

  {}
];


export default routes;
