"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type User {\n        id: Int!\n        userName: String!\n        email: String!\n        name: String!\n        location: String!\n        password: String!\n        avatarURL: String\n        githubUsername: String\n        searchs: [User]\n        followers(page:Int): [User]\n        followings(page:Int): [User]\n        createdAt: String!\n        updatedAt: String!\n    }\n"], ["\n    type User {\n        id: Int!\n        userName: String!\n        email: String!\n        name: String!\n        location: String!\n        password: String!\n        avatarURL: String\n        githubUsername: String\n        searchs: [User]\n        followers(page:Int): [User]\n        followings(page:Int): [User]\n        createdAt: String!\n        updatedAt: String!\n    }\n"])));
var templateObject_1;
