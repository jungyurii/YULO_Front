# YULO_Front

!['view'](public/main.png)

# 시작



## 준비

1. 최상단 폴더에서 `npm i`를 통해 관련 라이브러리 다운
2. 최상단 폴더에 `.env` 파일을 생성 한 후 지도 관련 API KEY를 설정

## 시작 명령어

- window의 경우 `npm start-win`
- mac의 경우 `npm start-mac`
위 명령어로 실행가능

## 파일 구조

프로젝트의 파일트리 구조는 아래와 같습니다

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜overlay.css
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📂curved-images
 ┃ ┃ ┃ ┗ 📜white-curved.jpeg
 ┃ ┃ ┣ 📂logos
 ┃ ┃ ┃ ┣ 📜mastercard.png
 ┃ ┃ ┃ ┗ 📜visa.png
 ┃ ┃ ┣ 📂model-images
 ┃ ┃ ┃ ┣ 📜detect_object.png
 ┃ ┃ ┃ ┗ 📜detect_smoke.png
 ┃ ┃ ┣ 📂shapes
 ┃ ┃ ┃ ┣ 📜car-profile.svg
 ┃ ┃ ┃ ┣ 📜graph-billing.svg
 ┃ ┃ ┃ ┣ 📜green-lightning.svg
 ┃ ┃ ┃ ┣ 📜waves-white.svg
 ┃ ┃ ┃ ┗ 📜white-lightning.svg
 ┃ ┃ ┣ 📂sidenav
 ┃ ┃ ┃ ┗ 📜sidenav-card-background.png
 ┃ ┃ ┣ 📂small-logos
 ┃ ┃ ┃ ┣ 📜icon-sun-cloud.png
 ┃ ┃ ┃ ┣ 📜logo-apple.svg
 ┃ ┃ ┃ ┣ 📜logo-atlassian.svg
 ┃ ┃ ┃ ┣ 📜logo-facebook.svg
 ┃ ┃ ┃ ┣ 📜logo-google.svg
 ┃ ┃ ┃ ┣ 📜logo-invision.svg
 ┃ ┃ ┃ ┣ 📜logo-jira.svg
 ┃ ┃ ┃ ┣ 📜logo-slack.svg
 ┃ ┃ ┃ ┣ 📜logo-spotify.svg
 ┃ ┃ ┃ ┣ 📜logo-webdev.svg
 ┃ ┃ ┃ ┣ 📜logo-xd.svg
 ┃ ┃ ┃ ┗ 📜marker.png
 ┃ ┃ ┣ 📜BalanceCardBg.png
 ┃ ┃ ┣ 📜avatar-simmmple.png
 ┃ ┃ ┣ 📜avatar1.png
 ┃ ┃ ┣ 📜avatar10.png
 ┃ ┃ ┣ 📜avatar11.png
 ┃ ┃ ┣ 📜avatar2.png
 ┃ ┃ ┣ 📜avatar3.png
 ┃ ┃ ┣ 📜avatar4.png
 ┃ ┃ ┣ 📜avatar5.png
 ┃ ┃ ┣ 📜avatar6.png
 ┃ ┃ ┣ 📜avatar7.png
 ┃ ┃ ┣ 📜avatar8.png
 ┃ ┃ ┣ 📜avatar9.png
 ┃ ┃ ┣ 📜background-card-reports.png
 ┃ ┃ ┣ 📜billing-background-balance.png
 ┃ ┃ ┣ 📜billing-background-card.png
 ┃ ┃ ┣ 📜body-background.png
 ┃ ┃ ┣ 📜bruce-mars.jpg
 ┃ ┃ ┣ 📜cardimgfree.png
 ┃ ┃ ┣ 📜ivana-square.jpg
 ┃ ┃ ┣ 📜ivana-squares.jpg
 ┃ ┃ ┣ 📜kal-visuals-square.jpg
 ┃ ┃ ┣ 📜logo-ct.png
 ┃ ┃ ┣ 📜marie.jpg
 ┃ ┃ ┣ 📜profile-1.png
 ┃ ┃ ┣ 📜profile-2.png
 ┃ ┃ ┣ 📜profile-3.png
 ┃ ┃ ┣ 📜signInImage.png
 ┃ ┃ ┣ 📜signUpImage.png
 ┃ ┃ ┣ 📜team-1.jpg
 ┃ ┃ ┣ 📜team-2.jpg
 ┃ ┃ ┣ 📜team-3.jpg
 ┃ ┃ ┣ 📜team-4.jpg
 ┃ ┃ ┣ 📜team-5.jpg
 ┃ ┃ ┗ 📜welcome-profile.png
 ┃ ┣ 📂theme
 ┃ ┃ ┣ 📂base
 ┃ ┃ ┃ ┣ 📜borders.js
 ┃ ┃ ┃ ┣ 📜boxShadows.js
 ┃ ┃ ┃ ┣ 📜breakpoints.js
 ┃ ┃ ┃ ┣ 📜colors.js
 ┃ ┃ ┃ ┣ 📜globals.js
 ┃ ┃ ┃ ┣ 📜typography.css
 ┃ ┃ ┃ ┗ 📜typography.js
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂button
 ┃ ┃ ┃ ┃ ┣ 📜contained.js
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┣ 📜outlined.js
 ┃ ┃ ┃ ┃ ┣ 📜root.js
 ┃ ┃ ┃ ┃ ┗ 📜text.js
 ┃ ┃ ┃ ┣ 📂card
 ┃ ┃ ┃ ┃ ┣ 📜cardContent.js
 ┃ ┃ ┃ ┃ ┣ 📜cardMedia.js
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂dialog
 ┃ ┃ ┃ ┃ ┣ 📜dialogActions.js
 ┃ ┃ ┃ ┃ ┣ 📜dialogContent.js
 ┃ ┃ ┃ ┃ ┣ 📜dialogContentText.js
 ┃ ┃ ┃ ┃ ┣ 📜dialogTitle.js
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂form
 ┃ ┃ ┃ ┃ ┣ 📜autocomplete.js
 ┃ ┃ ┃ ┃ ┣ 📜checkbox.js
 ┃ ┃ ┃ ┃ ┣ 📜formControlLabel.js
 ┃ ┃ ┃ ┃ ┣ 📜formLabel.js
 ┃ ┃ ┃ ┃ ┣ 📜input.js
 ┃ ┃ ┃ ┃ ┣ 📜inputBase.js
 ┃ ┃ ┃ ┃ ┣ 📜radio.js
 ┃ ┃ ┃ ┃ ┣ 📜select.js
 ┃ ┃ ┃ ┃ ┗ 📜switchButton.js
 ┃ ┃ ┃ ┣ 📂list
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┣ 📜listItem.js
 ┃ ┃ ┃ ┃ ┗ 📜listItemText.js
 ┃ ┃ ┃ ┣ 📂menu
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┗ 📜menuItem.js
 ┃ ┃ ┃ ┣ 📂stepper
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┣ 📜step.js
 ┃ ┃ ┃ ┃ ┣ 📜stepConnector.js
 ┃ ┃ ┃ ┃ ┣ 📜stepIcon.js
 ┃ ┃ ┃ ┃ ┗ 📜stepLabel.js
 ┃ ┃ ┃ ┣ 📂table
 ┃ ┃ ┃ ┃ ┣ 📜tableCell.js
 ┃ ┃ ┃ ┃ ┣ 📜tableContainer.js
 ┃ ┃ ┃ ┃ ┗ 📜tableHead.js
 ┃ ┃ ┃ ┣ 📂tabs
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┗ 📜tab.js
 ┃ ┃ ┃ ┣ 📜appBar.js
 ┃ ┃ ┃ ┣ 📜avatar.js
 ┃ ┃ ┃ ┣ 📜breadcrumbs.js
 ┃ ┃ ┃ ┣ 📜buttonBase.js
 ┃ ┃ ┃ ┣ 📜container.js
 ┃ ┃ ┃ ┣ 📜divider.js
 ┃ ┃ ┃ ┣ 📜icon.js
 ┃ ┃ ┃ ┣ 📜iconButton.js
 ┃ ┃ ┃ ┣ 📜linearProgress.js
 ┃ ┃ ┃ ┣ 📜link.js
 ┃ ┃ ┃ ┣ 📜popover.js
 ┃ ┃ ┃ ┣ 📜sidenav.js
 ┃ ┃ ┃ ┣ 📜slider.js
 ┃ ┃ ┃ ┣ 📜svgIcon.js
 ┃ ┃ ┃ ┗ 📜tooltip.js
 ┃ ┃ ┣ 📂functions
 ┃ ┃ ┃ ┣ 📜boxShadow.js
 ┃ ┃ ┃ ┣ 📜gradientChartLine.js
 ┃ ┃ ┃ ┣ 📜hexToRgb.js
 ┃ ┃ ┃ ┣ 📜linearGradient.js
 ┃ ┃ ┃ ┣ 📜pxToRem.js
 ┃ ┃ ┃ ┣ 📜radialGradient.js
 ┃ ┃ ┃ ┣ 📜rgba.js
 ┃ ┃ ┃ ┗ 📜tripleLinearGradient.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜theme-rtl.js
 ┃ ┣ 📂videos
 ┃ ┃ ┗ 📜output.mp4
 ┃ ┗ 📜.DS_Store
 ┣ 📂components
 ┃ ┣ 📂ImageButton
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiAlert
 ┃ ┃ ┣ 📜VuiAlertCloseIcon.js
 ┃ ┃ ┣ 📜VuiAlertRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiAvatar
 ┃ ┃ ┣ 📜VuiAvatarRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiBadge
 ┃ ┃ ┣ 📜VuiBadgeRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiBox
 ┃ ┃ ┣ 📜VuiBoxRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiButton
 ┃ ┃ ┣ 📜VuiButtonRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiInput
 ┃ ┃ ┣ 📜VuiInputIconBoxRoot.js
 ┃ ┃ ┣ 📜VuiInputIconRoot.js
 ┃ ┃ ┣ 📜VuiInputRoot.js
 ┃ ┃ ┣ 📜VuiInputWithIconRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiPagination
 ┃ ┃ ┣ 📜VuiPaginationItemRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiProgress
 ┃ ┃ ┣ 📜VuiProgressRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiSwitch
 ┃ ┃ ┣ 📜VuiSwitchRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂VuiTypography
 ┃ ┃ ┣ 📜VuiTypographyRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📜.DS_Store
 ┣ 📂context
 ┃ ┗ 📜index.js
 ┣ 📂examples
 ┃ ┣ 📂Breadcrumbs
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Cards
 ┃ ┃ ┣ 📂InfoCards
 ┃ ┃ ┃ ┗ 📂ProfileInfoCard
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂MasterCard
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂ProjectCards
 ┃ ┃ ┃ ┗ 📂DefaultProjectCard
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📂StatisticsCards
 ┃ ┃ ┃ ┗ 📂MiniStatisticsCard
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Charts
 ┃ ┃ ┣ 📂BarCharts
 ┃ ┃ ┃ ┗ 📜BarChart.js
 ┃ ┃ ┣ 📂LineCharts
 ┃ ┃ ┃ ┣ 📜LineChart.js
 ┃ ┃ ┃ ┣ 📜LineChart2.js
 ┃ ┃ ┃ ┗ 📜LineChart3.js
 ┃ ┃ ┣ 📂LiveCharts
 ┃ ┃ ┃ ┗ 📜LiveChart.js
 ┃ ┃ ┗ 📂PieCharts
 ┃ ┃ ┃ ┗ 📜PieChart.js
 ┃ ┣ 📂Configurator
 ┃ ┃ ┣ 📜ConfiguratorRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Footer
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂GradientBorder
 ┃ ┃ ┣ 📜GradientBorderRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Icons
 ┃ ┃ ┣ 📜AdobeXD.js
 ┃ ┃ ┣ 📜Atlassian.js
 ┃ ┃ ┣ 📜Basket.js
 ┃ ┃ ┣ 📜Cart.js
 ┃ ┃ ┣ 📜Credit.js
 ┃ ┃ ┣ 📜CreditCard.js
 ┃ ┃ ┣ 📜Cube.js
 ┃ ┃ ┣ 📜CustomerSupport.js
 ┃ ┃ ┣ 📜Document.js
 ┃ ┃ ┣ 📜DocumentV.js
 ┃ ┃ ┣ 📜Invision.js
 ┃ ┃ ┣ 📜Jira.js
 ┃ ┃ ┣ 📜Mastercard.js
 ┃ ┃ ┣ 📜Office.js
 ┃ ┃ ┣ 📜Settings.js
 ┃ ┃ ┣ 📜Shop.js
 ┃ ┃ ┣ 📜SimmmpleLogo.js
 ┃ ┃ ┣ 📜Slack.js
 ┃ ┃ ┣ 📜SpaceShip.js
 ┃ ┃ ┣ 📜Spotify.js
 ┃ ┃ ┗ 📜Visa.js
 ┃ ┣ 📂Items
 ┃ ┃ ┗ 📂NotificationItem
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┗ 📜styles.js
 ┃ ┣ 📂LayoutContainers
 ┃ ┃ ┣ 📂DashboardLayout
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📂PageLayout
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Lists
 ┃ ┃ ┗ 📂ProfilesList
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Navbars
 ┃ ┃ ┣ 📂DashboardNavbar
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┗ 📜styles.js
 ┃ ┃ ┗ 📂DefaultNavbar
 ┃ ┃ ┃ ┣ 📜DefaultNavbarLink.js
 ┃ ┃ ┃ ┣ 📜DefaultNavbarMobile.js
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Sidenav
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┃ ┣ 📜sidenav.js
 ┃ ┃ ┃ ┣ 📜sidenavCard.js
 ┃ ┃ ┃ ┗ 📜sidenavCollapse.js
 ┃ ┃ ┣ 📜SidenavCard.js
 ┃ ┃ ┣ 📜SidenavCollapse.js
 ┃ ┃ ┣ 📜SidenavRoot.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Tables
 ┃ ┃ ┗ 📂Table
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂Timeline
 ┃ ┃ ┣ 📂TimelineItem
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┗ 📜styles.js
 ┃ ┃ ┣ 📂TimelineList
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📂context
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📜.DS_Store
 ┣ 📂layouts
 ┃ ┣ 📂authentication
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂BasicLayout
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂CoverLayout
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂IllustrationLayout
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Separator
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂Socials
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂sign-in
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂Welcome
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂camera
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂GoogleMap
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂KakaoMap
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂MapBox
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜cameraData.js
 ┃ ┃ ┃ ┗ 📜projectsTableData.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂cameraMap
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂KakaoMap
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂Overlay
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜incheon.js
 ┃ ┃ ┃ ┗ 📜positions.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂AddCamera
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂OrderOverview
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Projects
 ┃ ┃ ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂ReferralTracking
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂SatisfactionRate
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂WelcomeMark
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜barChartData.js
 ┃ ┃ ┃ ┣ 📜barChartOptions.js
 ┃ ┃ ┃ ┣ 📜lineChartData.js
 ┃ ┃ ┃ ┗ 📜lineChartOptions.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂detected
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Bill
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂BillingInformation
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂CreditBalance
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Invoice
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Invoices
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂PaymentMethod
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Transaction
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂Transactions
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂CarInformations
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂PlatformSettings
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂Welcome
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜lineChartData1.js
 ┃ ┃ ┃ ┣ 📜lineChartData2.js
 ┃ ┃ ┃ ┣ 📜lineChartOptions1.js
 ┃ ┃ ┃ ┗ 📜lineChartOptions2.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂rtl
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂OrderOverview
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂Projects
 ┃ ┃ ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂ReferralTracking
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┣ 📂SatisfactionRate
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┃ ┗ 📂WelcomeMark
 ┃ ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜barChartData.js
 ┃ ┃ ┃ ┣ 📜barChartOptions.js
 ┃ ┃ ┃ ┣ 📜lineChartData.js
 ┃ ┃ ┃ ┗ 📜lineChartOptions.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┗ 📜.DS_Store
 ┣ 📂variables
 ┃ ┗ 📜charts.js
 ┣ 📜.DS_Store
 ┣ 📜App.js
 ┣ 📜index.js
 ┗ 📜routes.js
```
