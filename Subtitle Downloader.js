// ==UserScript==
// @name         YouTube Enhancer (Subtitle Downloader)
// @description  Download Subtitles in Various Languages.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      1.5
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @require      https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js
// @connect      get-info.downsub.com
// @connect      download.subtitle.to
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    const SECRET_KEY = "zthxw34cdp6wfyxmpad38v52t3hsz6c5";
    const API = "https://get-info.downsub.com/";
    
    const CryptoJS = window.CryptoJS;
    const GM_download = window.GM_download;
    const GM_xmlhttpRequest = window.GM_xmlhttpRequest;

    const formatJson = {
        stringify: function (crp) {
            let result = {
                ct: crp.ciphertext.toString(CryptoJS.enc.Base64)
            };
            if (crp.iv) {
                result.iv = crp.iv.toString();
            }
            if (crp.salt) {
                result.s = crp.salt.toString();
            }
            return JSON.stringify(result);
        },
        parse: function (output) {
            let parse = JSON.parse(output);
            let result = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(parse.ct)
            });
            if (parse.iv) {
                result.iv = CryptoJS.enc.Hex.parse(parse.iv);
            }
            if (parse.s) {
                result.salt = CryptoJS.enc.Hex.parse(parse.s);
            }
            return result;
        }
    };
    
    function _toBase64(payload) {
        let vBtoa = btoa(payload);
        vBtoa = vBtoa.replace("+", "-");
        vBtoa = vBtoa.replace("/", "_");
        vBtoa = vBtoa.replace("=", "");
        return vBtoa;
    }
    
    function _toBinary(base64) {
        let data = base64.replace("-", "+");
        data = data.replace("_", "/");
        const mod4 = data.length % 4;
        if (mod4) {
            data += "====".substring(mod4);
        }
        return atob(data);
    }
    
    function _encode(payload, options) {
        if (!payload) {
            return false;
        }
    
        let result = CryptoJS.AES.encrypt(JSON.stringify(payload), options || SECRET_KEY, {
            format: formatJson
        }).toString();
        return _toBase64(result).trim();
    }
    
    function _decode(payload, options) {
        if (!payload) {
            return false;
        }
    
        let result = CryptoJS.AES.decrypt(_toBinary(payload), options || SECRET_KEY, {
            format: formatJson
        }).toString(CryptoJS.enc.Utf8);
        return result.trim();
    }
    
    function _generateData(videoId) {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        let id = videoId;
        
        return {
            state: 99,
            url: url,
            urlEncrypt: _encode(url),
            source: 0,
            id: _encode(id),
            playlistId: null
        };
    }
    
    function _decodeArray(result) {
        let subtitles = [], subtitlesAutoTrans = [];
    
        if (result?.subtitles && result?.subtitles.length) {
            result.subtitles.forEach((v, i) => {
                let ff = {...v};
                ff.url = _decode(ff.url).replace(/^"|"$/gi, "");
                ff.enc_url = result.subtitles[i].url;
                ff.download = {};
                const params = new URLSearchParams({
                    title: encodeURIComponent(ff.name),
                    url: ff.enc_url
                });
                ff.download.srt = result.urlSubtitle + "?" + params.toString();
                
                const params2 = new URLSearchParams({
                    title: encodeURIComponent(ff.name),
                    url: ff.enc_url,
                    type: "txt"
                });
                ff.download.txt = result.urlSubtitle + "?" + params2.toString();
                
                const params3 = new URLSearchParams({
                    title: encodeURIComponent(ff.name),
                    url: ff.enc_url,
                    type: "raw"
                });
                ff.download.raw = result.urlSubtitle + "?" + params3.toString();
                subtitles.push(ff);
            });
        }
        
        if (result?.subtitlesAutoTrans && result?.subtitlesAutoTrans.length) {
            result.subtitlesAutoTrans.forEach((v, i) => {
                let ff = {...v};
                ff.url = _decode(ff.url).replace(/^"|"$/gi, "");
                ff.enc_url = result.subtitlesAutoTrans[i].url;
                ff.download = {};
                const params = new URLSearchParams({
                    title: encodeURIComponent(ff.name),
                    url: ff.enc_url
                });
                ff.download.srt = result.urlSubtitle + "?" + params.toString();
                
                const params2 = new URLSearchParams({
                    title: encodeURIComponent(ff.name),
                    url: ff.enc_url,
                    type: "txt"
                });
                ff.download.txt = result.urlSubtitle + "?" + params2.toString();
                
                const params3 = new URLSearchParams({
                    title: encodeURIComponent(ff.name),
                    url: ff.enc_url,
                    type: "raw"
                });
                ff.download.raw = result.urlSubtitle + "?" + params3.toString();
                subtitlesAutoTrans.push(ff);
            });
        }
    
        return Object.assign(result, {subtitles}, {subtitlesAutoTrans});
    }

    function createSVGIcon(className, isHover = false) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        svg.setAttribute("viewBox", "0 0 576 512");
        svg.classList.add(className);

        path.setAttribute("d", isHover
            ? "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm56 208l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm256 0l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM120 336l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm160 0l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
            : "M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l448 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM120 240l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm256 0l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zM120 336l80 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm160 0l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
        );

        svg.appendChild(path);
        return svg;
    }

    function createSearchIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        
        path.setAttribute("d", "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z");
        
        svg.appendChild(path);
        return svg;
    }

    function createCheckIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.classList.add("check-icon");
        
        path.setAttribute("d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z");
        
        svg.appendChild(path);
        return svg;
    }

    function getVideoId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }


    function downloadSubtitle(url, filename, format, buttonElement) {
        try {
            const buttonHeight = buttonElement.offsetHeight;
            const buttonWidth = buttonElement.offsetWidth;
            
            const originalChildren = Array.from(buttonElement.childNodes).map(node => node.cloneNode(true));
            
            while (buttonElement.firstChild) {
                buttonElement.removeChild(buttonElement.firstChild);
            }
            
            buttonElement.style.height = `${buttonHeight}px`;
            buttonElement.style.width = `${buttonWidth}px`;
            
            const spinner = document.createElement('div');
            spinner.className = 'button-spinner';
            buttonElement.appendChild(spinner);
            buttonElement.disabled = true;
            
            GM_download({
                url: url,
                name: filename,
                onload: function() {
                    while (buttonElement.firstChild) {
                        buttonElement.removeChild(buttonElement.firstChild);
                    }
                    
                    buttonElement.appendChild(createCheckIcon());
                    buttonElement.classList.add('download-success');
                    
                    setTimeout(() => {
                        while (buttonElement.firstChild) {
                            buttonElement.removeChild(buttonElement.firstChild);
                        }
                        
                        originalChildren.forEach(child => {
                            buttonElement.appendChild(child.cloneNode(true));
                        });
                        
                        buttonElement.disabled = false;
                        buttonElement.classList.remove('download-success');
                        
                        buttonElement.style.height = '';
                        buttonElement.style.width = '';
                    }, 1500);
                },
                onerror: function(error) {
                    console.error('Download error:', error);
                    
                    while (buttonElement.firstChild) {
                        buttonElement.removeChild(buttonElement.firstChild);
                    }
                    
                    originalChildren.forEach(child => {
                        buttonElement.appendChild(child.cloneNode(true));
                    });
                    
                    buttonElement.disabled = false;
                    
                    buttonElement.style.height = '';
                    buttonElement.style.width = '';
                }
            });
        } catch (error) {
            console.error('Download setup error:', error);
            
            while (buttonElement.firstChild) {
                buttonElement.removeChild(buttonElement.firstChild);
            }
            
            buttonElement.textContent = format;
            
            buttonElement.disabled = false;
            
            buttonElement.style.height = '';
            buttonElement.style.width = '';
        }
    }

    function filterSubtitles(subtitles, query) {
        if (!query) return subtitles;
        
        const lowerQuery = query.toLowerCase();
        return subtitles.filter(sub => 
            sub.name.toLowerCase().includes(lowerQuery)
        );
    }

    function createSubtitleTable(subtitles, autoTransSubs, videoTitle) {
        const container = document.createElement('div');
        container.className = 'subtitle-container';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'subtitle-dropdown-title';
        titleDiv.textContent = `Download Subtitles (${subtitles.length + autoTransSubs.length})`;
        container.appendChild(titleDiv);
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'subtitle-search-container';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'subtitle-search-input';
        searchInput.placeholder = 'Search languages...';
        
        const searchIcon = document.createElement('div');
        searchIcon.className = 'subtitle-search-icon';
        searchIcon.appendChild(createSearchIcon());
        
        searchContainer.appendChild(searchIcon);
        searchContainer.appendChild(searchInput);
        container.appendChild(searchContainer);

        const tabsDiv = document.createElement('div');
        tabsDiv.className = 'subtitle-tabs';

        const regularTab = document.createElement('div');
        regularTab.className = 'subtitle-tab active';
        regularTab.textContent = 'Original';
        regularTab.dataset.tab = 'regular';

        const autoTab = document.createElement('div');
        autoTab.className = 'subtitle-tab';
        autoTab.textContent = 'Auto Translate';
        autoTab.dataset.tab = 'auto';

        tabsDiv.appendChild(regularTab);
        tabsDiv.appendChild(autoTab);
        container.appendChild(tabsDiv);

        const itemsPerPage = 30;
        
        const regularContent = createSubtitleContent(subtitles, videoTitle, true, itemsPerPage);
        regularContent.className = 'subtitle-content regular-content active';

        const autoContent = createSubtitleContent(autoTransSubs, videoTitle, false, itemsPerPage);
        autoContent.className = 'subtitle-content auto-content';

        container.appendChild(regularContent);
        container.appendChild(autoContent);

        tabsDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('subtitle-tab')) {
                document.querySelectorAll('.subtitle-tab').forEach(tab => tab.classList.remove('active'));
                document.querySelectorAll('.subtitle-content').forEach(content => content.classList.remove('active'));

                e.target.classList.add('active');
                const tabType = e.target.dataset.tab;
                document.querySelector(`.${tabType}-content`).classList.add('active');
                
                searchInput.value = '';
                
                const activeContent = document.querySelector(`.${tabType}-content`);
                const grid = activeContent.querySelector('.subtitle-grid');
                
                if (tabType === 'regular') {
                    renderPage(1, subtitles, grid, itemsPerPage, videoTitle);
                } else {
                    renderPage(1, autoTransSubs, grid, itemsPerPage, videoTitle);
                }
                
                const pagination = activeContent.querySelector('.subtitle-pagination');
                updatePagination(
                    1, 
                    Math.ceil((tabType === 'regular' ? subtitles : autoTransSubs).length / itemsPerPage),
                    pagination,
                    null,
                    grid,
                    tabType === 'regular' ? subtitles : autoTransSubs,
                    itemsPerPage,
                    videoTitle
                );
            }
        });
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            const activeTab = document.querySelector('.subtitle-tab.active').dataset.tab;
            const activeContent = document.querySelector(`.${activeTab}-content`);
            const grid = activeContent.querySelector('.subtitle-grid');
            const pagination = activeContent.querySelector('.subtitle-pagination');
            
            const sourceSubtitles = activeTab === 'regular' ? subtitles : autoTransSubs;
            const filteredSubtitles = filterSubtitles(sourceSubtitles, query);
            
            renderPage(1, filteredSubtitles, grid, itemsPerPage, videoTitle);
            updatePagination(
                1, 
                Math.ceil(filteredSubtitles.length / itemsPerPage), 
                pagination, 
                filteredSubtitles,
                grid,
                sourceSubtitles,
                itemsPerPage,
                videoTitle
            );
            
            grid.dataset.filteredCount = filteredSubtitles.length;
            grid.dataset.query = query;
        });

        return container;
    }

    function renderPage(page, subtitlesList, gridElement, itemsPerPage, videoTitle) {
        while (gridElement.firstChild) {
            gridElement.removeChild(gridElement.firstChild);
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, subtitlesList.length);

        for (let i = startIndex; i < endIndex; i++) {
            const sub = subtitlesList[i];
            const item = document.createElement('div');
            item.className = 'subtitle-item';

            const langLabel = document.createElement('div');
            langLabel.className = 'subtitle-language';
            langLabel.textContent = sub.name;
            item.appendChild(langLabel);

            const btnContainer = document.createElement('div');
            btnContainer.className = 'subtitle-format-container';

            const srtBtn = document.createElement('button');
            srtBtn.textContent = 'SRT';
            srtBtn.className = 'subtitle-format-btn srt-btn';
            srtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadSubtitle(sub.download.srt, `${videoTitle} - ${sub.name}.srt`, 'SRT', srtBtn);
            });
            btnContainer.appendChild(srtBtn);

            const txtBtn = document.createElement('button');
            txtBtn.textContent = 'TXT';
            txtBtn.className = 'subtitle-format-btn txt-btn';
            txtBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadSubtitle(sub.download.txt, `${videoTitle} - ${sub.name}.txt`, 'TXT', txtBtn);
            });
            btnContainer.appendChild(txtBtn);

            item.appendChild(btnContainer);
            gridElement.appendChild(item);
        }
    }

    function updatePagination(page, totalPages, paginationElement, filteredSubs, gridElement, sourceSubtitles, itemsPerPage, videoTitle) {
        while (paginationElement.firstChild) {
            paginationElement.removeChild(paginationElement.firstChild);
        }

        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '«';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = page === 1;
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (page > 1) {
                const newPage = page - 1;
                const query = gridElement.dataset.query;
                const subsToUse = query && filteredSubs ? filteredSubs : sourceSubtitles;
                
                renderPage(newPage, subsToUse, gridElement, itemsPerPage, videoTitle);
                updatePagination(
                    newPage, 
                    totalPages, 
                    paginationElement, 
                    filteredSubs,
                    gridElement,
                    sourceSubtitles,
                    itemsPerPage,
                    videoTitle
                );
            }
        });
        paginationElement.appendChild(prevBtn);

        const pageIndicator = document.createElement('span');
        pageIndicator.className = 'page-indicator';
        pageIndicator.textContent = `${page} / ${totalPages}`;
        paginationElement.appendChild(pageIndicator);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '»';
        nextBtn.className = 'pagination-btn';
        nextBtn.disabled = page === totalPages;
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (page < totalPages) {
                const newPage = page + 1;
                const query = gridElement.dataset.query;
                const subsToUse = query && filteredSubs ? filteredSubs : sourceSubtitles;
                
                renderPage(newPage, subsToUse, gridElement, itemsPerPage, videoTitle);
                updatePagination(
                    newPage, 
                    totalPages, 
                    paginationElement, 
                    filteredSubs,
                    gridElement,
                    sourceSubtitles,
                    itemsPerPage,
                    videoTitle
                );
            }
        });
        paginationElement.appendChild(nextBtn);
    }

    function createSubtitleContent(subtitles, videoTitle, isOriginal, itemsPerPage) {
        const content = document.createElement('div');
        let currentPage = 1;

        const grid = document.createElement('div');
        grid.className = 'subtitle-grid';
        
        if (isOriginal && subtitles.length <= 6) {
            grid.classList.add('center-grid');
        }
        
        grid.dataset.filteredCount = subtitles.length;
        grid.dataset.query = '';

        const pagination = document.createElement('div');
        pagination.className = 'subtitle-pagination';

        renderPage(currentPage, subtitles, grid, itemsPerPage, videoTitle);
        updatePagination(
            currentPage, 
            Math.ceil(subtitles.length / itemsPerPage), 
            pagination, 
            null,
            grid,
            subtitles,
            itemsPerPage,
            videoTitle
        );

        content.appendChild(grid);
        content.appendChild(pagination);

        return content;
    }

    async function handleSubtitleDownload(e) {
        e.preventDefault();
        const videoId = getVideoId();

        if (!videoId) {
            console.error('Video ID not found');
            return;
        }

        const backdrop = document.createElement('div');
        backdrop.className = 'subtitle-backdrop';
        document.body.appendChild(backdrop);

        const loader = document.createElement('div');
        loader.className = 'subtitle-loader';
        backdrop.appendChild(loader);

        try {
            const data = _generateData(videoId);
            
            const headersList = {
                "authority": "get-info.downsub.com",
                "accept": "application/json, text/plain, */*",
                "accept-language": "id-ID,id;q=0.9",
                "origin": "https://downsub.com",
                "priority": "u=1, i",
                "referer": "https://downsub.com/",
                "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
            };
            
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: API + data.id,
                    headers: headersList,
                    responseType: 'json',
                    onload: function(response) {
                        if (response.status >= 200 && response.status < 300) {
                            resolve(response.response);
                        } else {
                            reject(new Error(`Request failed with status ${response.status}`));
                        }
                    },
                    onerror: function() {
                        reject(new Error('Network error'));
                    }
                });
            });

            const processedResponse = _decodeArray(response);

            const videoTitleElement = document.querySelector('yt-formatted-string.style-scope.ytd-watch-metadata');
            const videoTitle = videoTitleElement ? videoTitleElement.textContent.trim() : `youtube_video_${videoId}`;

            loader.remove();

            if (!processedResponse.subtitles || processedResponse.subtitles.length === 0 &&
                (!processedResponse.subtitlesAutoTrans || processedResponse.subtitlesAutoTrans.length === 0)) {
                while (backdrop.firstChild) {
                    backdrop.removeChild(backdrop.firstChild);
                }
                const errorDiv = document.createElement('div');
                errorDiv.className = 'subtitle-error';
                errorDiv.textContent = 'No subtitles available for this video';
                backdrop.appendChild(errorDiv);

                setTimeout(() => {
                    backdrop.remove();
                }, 2000);
                return;
            }

            const subtitleTable = createSubtitleTable(
                processedResponse.subtitles || [],
                processedResponse.subtitlesAutoTrans || [],
                videoTitle
            );
            backdrop.appendChild(subtitleTable);

            backdrop.addEventListener('click', (e) => {
                if (!subtitleTable.contains(e.target)) {
                    subtitleTable.remove();
                    backdrop.remove();
                }
            });

            subtitleTable.addEventListener('click', (e) => {
                e.stopPropagation();
            });

        } catch (error) {
            console.error('Error fetching subtitles:', error);

            while (backdrop.firstChild) {
                backdrop.removeChild(backdrop.firstChild);
            }
            const errorDiv = document.createElement('div');
            errorDiv.className = 'subtitle-error';
            errorDiv.textContent = 'Error fetching subtitles. Please try again.';
            backdrop.appendChild(errorDiv);

            setTimeout(() => {
                backdrop.remove();
            }, 2000);
        }
    }

    function initializeStyles(computedStyle) {
        if (document.querySelector('#yt-subtitle-downloader-styles')) return;

        const style = document.createElement('style');
        style.id = 'yt-subtitle-downloader-styles';
        style.textContent = `
            .custom-subtitle-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                width: ${computedStyle.width};
                height: ${computedStyle.height};
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            @-moz-document url-prefix() {
                .custom-subtitle-btn {
                    top: 0;
                    margin-bottom: 0;
                    vertical-align: top;
                }
            }
            .custom-subtitle-btn svg {
                width: 24px;
                height: 24px;
                fill: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 1;
                transition: opacity 0.2s ease-in-out;
            }
            .custom-subtitle-btn .hover-icon {
                opacity: 0;
            }
            .custom-subtitle-btn:hover .default-icon {
                opacity: 0;
            }
            .custom-subtitle-btn:hover .hover-icon {
                opacity: 1;
            }
            .subtitle-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(3px);
            }
            .subtitle-loader {
                width: 40px;
                height: 40px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 4px solid #fff;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .subtitle-error {
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 16px 24px;
                border-radius: 8px;
                font-size: 14px;
            }
            .subtitle-container {
                position: relative;
                background: rgba(28, 28, 28, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 16px;
                z-index: 9999;
                min-width: 700px;
                max-width: 90vw;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                color: #fff;
                font-family: 'Roboto', Arial, sans-serif;
            }
            .subtitle-dropdown-title {
                color: #fff;
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 16px;
                text-align: center;
            }
            .subtitle-search-container {
                position: relative;
                margin-bottom: 16px;
                width: 100%;
                max-width: 100%;
            }
            .subtitle-search-input {
                width: 100%;
                padding: 8px 12px 8px 36px;
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 14px;
                box-sizing: border-box;
            }
            .subtitle-search-input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            .subtitle-search-input:focus {
                outline: none;
                border-color: rgba(255, 255, 255, 0.4);
                background: rgba(255, 255, 255, 0.15);
            }
            .subtitle-search-icon {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .subtitle-search-icon svg {
                fill: rgba(255, 255, 255, 0.5);
            }
            .subtitle-tabs {
                display: flex;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 16px;
                justify-content: center;
            }
            .subtitle-tab {
                padding: 10px 20px;
                cursor: pointer;
                opacity: 0.7;
                transition: all 0.2s;
                border-bottom: 2px solid transparent;
                font-size: 15px;
                font-weight: 500;
            }
            .subtitle-tab:hover {
                opacity: 1;
            }
            .subtitle-tab.active {
                opacity: 1;
                border-bottom: 2px solid #2b7fff;
            }
            .subtitle-content {
                display: none;
            }
            .subtitle-content.active {
                display: block;
            }
            .subtitle-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin-bottom: 16px;
            }
            .subtitle-grid.center-grid {
                justify-content: center;
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
            }
            .center-grid .subtitle-item {
                width: 200px;
            }
            .subtitle-item {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
                padding: 10px;
                transition: all 0.2s;
            }
            .subtitle-item:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            .subtitle-language {
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .subtitle-format-container {
                display: flex;
                gap: 8px;
            }
            .subtitle-format-btn {
                flex: 1;
                padding: 6px 0;
                border-radius: 4px;
                border: none;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
                position: relative;
                height: 28px;
                line-height: 16px;
            }
            .button-spinner {
                width: 14px;
                height: 14px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top: 2px solid #fff;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            .check-icon {
                width: 14px;
                height: 14px;
                fill: white;
                margin: 0 auto;
            }
            .download-success {
                background-color: #00a63e !important;
            }
            .srt-btn {
                background-color: #2b7fff;
                color: white;
            }
            .srt-btn:hover {
                background-color: #50a2ff;
            }
            .txt-btn {
                background-color: #615fff;
                color: white;
            }
            .txt-btn:hover {
                background-color: #7c86ff;
            }
            .subtitle-pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
            }
            .pagination-btn {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: all 0.2s;
            }
            .pagination-btn:not(:disabled):hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .pagination-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            .page-indicator {
                margin: 0 16px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
            }
        `;
        document.head.appendChild(style);
    }

    function initializeButton() {
        if (document.querySelector('.custom-subtitle-btn')) return;

        const originalButton = document.querySelector('.ytp-subtitles-button');
        if (!originalButton) return;

        const newButton = document.createElement('button');
        const computedStyle = window.getComputedStyle(originalButton);

        Object.assign(newButton, {
            className: 'ytp-button custom-subtitle-btn',
            title: 'Download Subtitles'
        });

        newButton.setAttribute('aria-pressed', 'false');
        initializeStyles(computedStyle);

        newButton.append(
            createSVGIcon('default-icon', false),
            createSVGIcon('hover-icon', true)
        );

        newButton.addEventListener('click', (e) => {
            const existingDropdown = document.querySelector('.subtitle-container');
            existingDropdown ? existingDropdown.remove() : handleSubtitleDownload(e);
        });

        originalButton.insertAdjacentElement('afterend', newButton);
    }

    function initializeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const isVideoPage = window.location.pathname === '/watch';
                    if (isVideoPage && !document.querySelector('.custom-subtitle-btn')) {
                        initializeButton();
                    }
                }
            });
        });

        function startObserving() {
            const playerContainer = document.getElementById('player-container');
            const contentContainer = document.getElementById('content');

            if (playerContainer) {
                observer.observe(playerContainer, {
                    childList: true,
                    subtree: true
                });
            }

            if (contentContainer) {
                observer.observe(contentContainer, {
                    childList: true,
                    subtree: true
                });
            }

            if (window.location.pathname === '/watch') {
                initializeButton();
            }
        }

        startObserving();

        if (!document.getElementById('player-container')) {
            const retryInterval = setInterval(() => {
                if (document.getElementById('player-container')) {
                    startObserving();
                    clearInterval(retryInterval);
                }
            }, 1000);

            setTimeout(() => clearInterval(retryInterval), 10000);
        }

        const handleNavigation = () => {
            if (window.location.pathname === '/watch') {
                initializeButton();
            }
        };

        window.addEventListener('yt-navigate-finish', handleNavigation);

        return () => {
            observer.disconnect();
            window.removeEventListener('yt-navigate-finish', handleNavigation);
        };
    }

    function addSubtitleButton() {
        initializeObserver();
    }

    addSubtitleButton();
})();