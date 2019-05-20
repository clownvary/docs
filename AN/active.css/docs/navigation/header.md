---
layout: page
title: Header
---

## Header

### Desktop header

The header on desktop will align center on the page. The width is 1024px but you can modify it by your self.

#### Interaction Details

- The header and primary navigation are persistent throughout the entire application.
- Open dropdown list onClick (rather than onHover) to avoid the hover tunnel.
- Logo – Champion logo along with market-specific logo links back to the hompage.
- Cursor – Change to pointer hand when hovering over a navigation item.
- Tab labels – Do not wrap or concatenate text.

#### Style guide Details

- Submenu have three classes to control alignment `left|mid|right`, you can use these to control the submenu alignment.
- If top leve menu has submenu you must add a class name `child` on item.
- Use class name "active" for current page on top leve menu.
- If you want modify header width, you can set modofiy width of class name `.header--desktop__wrap`, it will be useful.

#### Demo

{% example html %}
  <div class="header-example">
    <header class="header--desktop">
      <div class="header--desktop__infobar">
      <div class="header--desktop__wrap">
        <a href="/" class="header--desktop__logo"><img src="data:image/png;base64,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"
            alt="LeagueOne" height="19" width="228"></a>
        <div class="header--desktop__info">
          <div class="item"><i class="item-icon icon-bank"></i><span>L1 Test Club</span></div>
          <div class="item item-user"><i class="item-icon icon-user"></i><span>ACTIVE ADMIN</span>
            <div class="header--desktop__submenu">
              <menu class="header--desktop__group">
                <li><a href="/admin/Pages/FUS/FusAccountSettings.aspx">Account Settings</a></li>
                <li><a href="javascript:;">Switch Organization</a></li>
                <li><a href="https://passportui-vip.qa.aw.dev.activenetwork.com/logout?client_id=3fa00a94-2bf5-4b58-9155-c0bdd4763602&amp;redirect_uri=http://localhost/Admin/gnL1Logout.aspx">Logout</a></li>
              </menu>
            </div>
          </div><a target="_blank" class="item" href=""><i class="item-icon icon-help"></i><span>Help</span></a></div>
      </div>
    </div>
    <div class="header--desktop__nav">
      <nav class="header--desktop__wrap">
        <div class="item child"><span class="item-text">Players</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li class="subGroup">
                <h5>Configure Settings</h5>
                <menu class="header--desktop__group">
                  <li><a href="/admin/ClinicManagement.aspx">Clinic Management</a></li>
                  <li><a href="/admin/ClImportMain.aspx">Import</a></li>
                  <li><a href="/admin/Pages/SelfSetup/SelfSetupProgramList.aspx?FirstLoad=True">Online Registration Setup</a></li>
                  <li><a href="/admin/ClOrStatus.aspx">Online Registration Status</a></li>
                  <li><a href="/admin/ClProgramList.aspx">Program List</a></li>
                  <li><a href="/admin/Pages/ODP/TryoutManagement.aspx">Tryout Management</a></li>
                  <li><a href="/admin/ClOrUpdate.aspx">Update Online Registration</a></li>
                </menu>
              </li>
              <li class="subGroup">
                <h5>Manage Registration</h5>
                <menu class="header--desktop__group">
                  <li><a href="/admin/TmAgeDivMergeDisplay.aspx">Configure Merged Age Groups</a></li>
                  <li><a href="/admin/Pages/EvaluationForm/EvaluationFormMgmt.aspx">Evaluation Form Management</a></li>
                  <li><a href="/admin/ClDefaultMaintain.aspx">Maintain Club Information</a></li>
                  <li><a href="/admin/StatementAdmin.aspx">Statement Admin</a></li>
                </menu>
              </li>
              <li class="subGroup">
                <h5>Configure Settings</h5>
                <menu class="header--desktop__group">
                  <li><a href="/admin/TmAgeDivMergeDisplay.aspx">Configure Merged Age Groups</a></li>
                  <li><a href="/admin/Pages/EvaluationForm/EvaluationFormMgmt.aspx">Evaluation Form Management</a></li>
                  <li><a href="/admin/ClDefaultMaintain.aspx">Maintain Club Information</a></li>
                  <li><a href="/admin/StatementAdmin.aspx">Statement Admin</a></li>
                </menu>
                <h5>Manage Registration</h5>
                <menu class="header--desktop__group">
                  <li><a href="/admin/ClinicManagement.aspx">Clinic Management</a></li>
                  <li><a href="/admin/ClImportMain.aspx">Import</a></li>
                  <li><a href="/admin/Pages/SelfSetup/SelfSetupProgramList.aspx?FirstLoad=True">Online Registration Setup</a></li>
                  <li><a href="/admin/ClOrStatus.aspx">Online Registration Status</a></li>
                  <li><a href="/admin/ClProgramList.aspx">Program List</a></li>
                  <li><a href="/admin/Pages/ODP/TryoutManagement.aspx">Tryout Management</a></li>
                  <li><a href="/admin/ClOrUpdate.aspx">Update Online Registration</a></li>
                </menu>
              </li>
            </menu>
          </div>
        </div>
        <div class="item child"><span class="item-text">Teams</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li><a href="/admin/TmTeamFind.aspx">Maintain Teams</a></li>
              <li><a href="/admin/TmBldMain.aspx">Team Builder</a></li>
              <li><a href="/admin/Pages/MyTeams.aspx">My Teams</a></li>
            </menu>
          </div>
        </div>
        <div class="item child"><span class="item-text">Staff</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li><a href="/admin/StStaffFind.aspx">Maintain Staff Information</a></li>
              <li><a href="/admin/StRmByStaff.aspx">Risk Mgmt By Volunteer</a></li>
              <li><a href="/admin/StRmByDisclosure.aspx">Risk Mgmt By Disclosure</a></li>
              <li><a href="/admin/StRmBatches.aspx">Background Checks</a></li>
              <li><a href="/admin/StMyStaff.aspx">My Staff Record</a></li>
              <li><a href="/admin/MVC/Certification/ConcussionCertList">Concussion Certifications</a></li>
            </menu>
          </div>
        </div>
        <div class="item child"><span class="item-text">Communications</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li><a href="/admin/GnEmailCreateDist.aspx">Contact List</a></li>
              <li><a href="/admin/GnEmailCreate.aspx">Send Email</a></li>
              <li><a href="/admin/Pages/TeamCommunicationWizard.aspx">Team Communication Wizard</a></li>
              <li><a href="/admin/GnEmailArchive.aspx">Email Archive</a></li>
              <li><a href="/admin/MVC/WelcomLetterTemplate/Template?ngbLevel=true&amp;rightCondition=any">Welcome Information Email</a></li>
            </menu>
          </div>
        </div>
        <div class="item child"><span class="item-text">Reporting</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li><a href="/admin/Pages/RpCustomReports.aspx?Tab=Recent">Report Center</a></li>
              <li><a href="/admin/orgClubSettlement.aspx">LeagueOne Reconciliation</a></li>
              <li><a href="/admin/Pages/AdExportStaffData.aspx">Export Staff Data</a></li>
              <li><a href="/admin/Pages/AdExportPlayerData.aspx">Export Player Data</a></li>
            </menu>
          </div>
        </div>
        <div class="item child"><span class="item-text">Scheduler</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li><a href="/admin/SchLocationMgmt.aspx">Location Management</a></li>
              <li><a href="/admin/SchScheduleMgmt.aspx">Schedule Management</a></li>
            </menu>
          </div>
        </div>
        <div class="item child"><span class="item-text">Website</span>
          <div class="header--desktop__submenu left">
            <menu class="header--desktop__group">
              <li><a href="/admin/Pages/SelfSetup/SetupWebsite.aspx">Set up Website</a></li>
              <li><a href="javascript: parent.main.openHelpWebSiteWindow();">Website Help</a></li>
            </menu>
          </div>
        </div>
      </nav>
    </div>
  </header>
</div>
{% endexample %}

### Tablet header

{% example html %}
<style>
  .close {
    float: initial;
    font-size: initial;
    font-weight: initial;
    line-height: initial;
    color: initial;
    text-shadow: initial;
    opacity: initial;
  }
</style>
<nav class="header--tablet__navbar">
  <ul class="header--tablet__nav">
    <li class="close">
      <a href="javascript:;">OVERVIEW</a>
      <ul class="header--tablet__nav-sub">
        <li>
          <a href="">PLAYER</a>
          <ul class="header--tablet__nav-sub-sub">
            <li>
              <a href="">Register a Player</a>
            </li>
            <li>
              <a href="">Maintain Player Information</a>
            </li>
            <li>
              <a href="">Payment Schedules</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="open">
      <a href="javascript:;">PEOPLE</a>
      <ul class="header--tablet__nav-sub">
        <li>
          <a href="">PLAYER</a>
          <ul class="header--tablet__nav-sub-sub">
            <li>
              <a href="">Register a Player</a>
            </li>
            <li>
              <a href="">Maintain Player Information</a>
            </li>
            <li>
              <a href="">Payment Schedules</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li class="active close">
      <a href="javascript:;">COMMUNICATIONS</a>
      <ul class="header--tablet__nav-sub">
        <li>
          <a href="">PLAYER</a>
          <ul class="header--tablet__nav-sub-sub">
            <li>
              <a href="">Register a Player</a>
            </li>
            <li>
              <a href="">Maintain Player Information</a>
            </li>
            <li>
              <a href="">Payment Schedules</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>
{% endexample %}

### Tablet Header topbar

{% example html %}
<div class="header--tablet__topbar">
  <a href='javascript:;' class="header--tablet__topbar-nav">
    <i class="icon-bars"></i>
  </a>
  <a href='javascript:;' class="header--tablet__topbar-logo">
    <img src="data:image/png;base64,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"
        alt=""/>
  </a>
  <a href='javascript:;' class="header--tablet__topbar-nav">
    <i class="icon-user"></i>
  </a>
</div>
{% endexample %}

### Tablet Header aside

{% example html %}
<div class="header--tablet__aside">
  <a class="header--tablet__aside-info">
    <i class="icon-user"></i>
    <span>Active User Sheldon Amas SM Smcoco Yang Wow</span>
  </a>
  <a class="header--tablet__aside-info">
    <i class="icon-cog"></i>
    <span>Active Org</span>
  </a>
  <div class="header--tablet__aside-divider"></div>
  <a class="header--tablet__aside-nav">ACCOUNT SETTING</a>
  <a class="header--tablet__aside-nav">SWITCH ORGANIZATION</a>
  <a class="header--tablet__aside-nav">HELP</a>
  <a class="header--tablet__aside-nav">LOGOUT</a>
</div>
{% endexample %}
