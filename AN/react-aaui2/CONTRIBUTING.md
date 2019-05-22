# How to contribute

We'd love to get contributions from you and also need your help for keeping react-aaui great. There're a few guidelines that we need your attention and to follow so that we could get a chance to keep on top of different kinds of things.

## Get Started to Make Changes

* Clone the repo or pull the latest code base based on master branch
* Make sure the tests pass

~~~Bash
npm test
~~~

* Create the feature branch(Feature Branch Workflow) from where you want to start your development work
  * Name your feature branch as `yourDomainAccount-issue-conciseDescription`, for example, **kzhang-UrlInput**
  * Merge matster change to your branch every day would be better development habit
  * Make sure anything in the master branch is always deployable
* Make your commits based on the feature branch
* Make sure your commit message following the [git styleguide](http://udacity.github.io/git-styleguide/)
* Add necessary and enough unit tests for your changes, incluing features and bug fixes
* Make sure **all of the tests** are not broken by your changes and reach the code coverage threshold(around 90%)
* ~~Run [`npm run build`](https://gitlab.dev.activenetwork.com/fee/react-aaui#build) for shipping out with **AMD**, **CommonJS** or **ES2015** module formats and commit the changes~~ (it'd be get done once released automatically)
* Push your commits to your feature branch and then submit a **Merge Request** for starting the Code Review and conversation about proposed changes before they're merged into the master branch
* After everything is done, add or update your component's doc in [react-aaui-doc](https://gitlab.dev.activenetwork.com/fee/react-aaui-doc)

>The point of our code review is to eliminate as many defects as possible, regardless of who caused the error. Also, we should strictly follow pre-commit code review. While working on a new feature, Bill(for example) will cut a branch from the current version of our master and work exclusively on that branch, I'm sure most of you are familar with this approach. However, before Bill could reintegrate the changes into master, Shirly, Daniel or another qualified engineer must review his work and give him the stamp of approval: **LGTM(looks good to me)** If Shirly or Daniel has an issue or problem with the way Bill has desinged or coded for the work, they should have a discussion until they reach an agreement. Or if Shirly has no issues or problems, she could LGTM the work right way.

## Important Notes

If you want your MR is accepted as soon as possible, there are some guidelines you should be aware of when filling a Merge Request:

- Write good tests, features and bug fixeds should be covered by test cases
- Write a good and concise commit message and follow the [Angular Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)

## Reference

* [GitLab Add Merge Request](https://docs.gitlab.com/ee/gitlab-basics/add-merge-request.html)


**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)
