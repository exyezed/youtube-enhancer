// ==UserScript==
// @name         YouTube Enhancer (Thumbnail Preview)
// @description  View Original Avatar, Banner, Video and Shorts Thumbnails.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      2.0
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function extractVideoId(thumbnailSrc) {
        const match = thumbnailSrc.match(/\/vi\/([^\/]+)\//);
        return match ? match[1] : null;
    }

    function extractShortsId(href) {
        const match = href.match(/\/shorts\/([^\/\?]+)/);
        return match ? match[1] : null;
    }

    async function checkImageExists(url) {
        try { 
            const corsTest = await fetch(url, { method: 'HEAD' }).catch(() => null);
            
            if (corsTest) {
                return corsTest.ok;
            } else {
                return true;
            }
            
        } catch (error) {
            return new Promise((resolve) => {
                const img = document.createElement('img');
                img.style.display = 'none';
                
                const timeout = setTimeout(() => {
                    document.body.removeChild(img);
                    resolve(false);
                }, 2000);
                
                img.onload = () => {
                    clearTimeout(timeout);
                    document.body.removeChild(img);
                    resolve(true);
                };
                
                img.onerror = () => {
                    clearTimeout(timeout);
                    document.body.removeChild(img);
                    resolve(false);
                };
                
                document.body.appendChild(img);
                img.src = url;
            });
        }
    }

    function createSpinner() {
        const spinner = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        spinner.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        spinner.setAttribute('width', '16');
        spinner.setAttribute('height', '16');
        spinner.setAttribute('viewBox', '0 0 24 24');
        spinner.setAttribute('fill', 'none');
        spinner.setAttribute('stroke', 'white');
        spinner.setAttribute('stroke-width', '2');
        spinner.setAttribute('stroke-linecap', 'round');
        spinner.setAttribute('stroke-linejoin', 'round');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M21 12a9 9 0 1 1-6.219-8.56');
        spinner.appendChild(path);
        
        spinner.style.animation = 'spin 1s linear infinite';
        
        if (!document.querySelector('#spinner-keyframes')) {
            const style = document.createElement('style');
            style.id = 'spinner-keyframes';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        return spinner;
    }    
    
    async function openThumbnail(videoId, isShorts, overlayElement) {
        if (isShorts) {
            const originalSvg = overlayElement.querySelector('svg');
            const spinner = createSpinner();
            overlayElement.replaceChild(spinner, originalSvg);
            
            try {
                const oardefaultUrl = `https://i.ytimg.com/vi/${videoId}/oardefault.jpg`;
                const isOarDefaultAvailable = await checkImageExists(oardefaultUrl);
                
                if (isOarDefaultAvailable) {
                    window.open(oardefaultUrl, '_blank');
                } else {
                    window.open(`https://i.ytimg.com/vi/${videoId}/oar2.jpg`, '_blank');
                }
            } finally {
                overlayElement.replaceChild(originalSvg, spinner);
            }
        } else {
            const originalSvg = overlayElement.querySelector('svg');
            const spinner = createSpinner();
            overlayElement.replaceChild(spinner, originalSvg);
            
            try {
                const maxresdefaultUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
                const isMaxResAvailable = await checkImageExists(maxresdefaultUrl);
                
                if (isMaxResAvailable) {
                    window.open(maxresdefaultUrl, '_blank');
                } else {
                    window.open(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, '_blank');
                }
            } finally {
                overlayElement.replaceChild(originalSvg, spinner);
            }
        }
    }

    let thumbnailPreviewCurrentVideoId = "";
    let thumbnailPreviewClosed = false;
    let thumbnailInsertionAttempts = 0;
    const MAX_ATTEMPTS = 10;
    const RETRY_DELAY = 500;

    function isWatchPage() {
        const url = new URL(window.location.href);
        return url.pathname === "/watch" && url.searchParams.has("v");
    }

    function addOrUpdateThumbnailImage() {
        if (!isWatchPage()) return;

        const newVideoId = new URLSearchParams(window.location.search).get("v");

        if (newVideoId !== thumbnailPreviewCurrentVideoId) {
            thumbnailPreviewClosed = false;
        }

        if (!newVideoId || newVideoId === thumbnailPreviewCurrentVideoId || thumbnailPreviewClosed) {
            return;
        }

        thumbnailPreviewCurrentVideoId = newVideoId;

        function attemptInsertion() {
            const targetElement = document.querySelector("#secondary-inner #panels");
            const existingContainer = document.getElementById("thumbnailPreview-custom-container");

            if (existingContainer) {
                const existingImg = existingContainer.querySelector("img");
                if (existingImg) {
                    existingImg.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
                }
                thumbnailInsertionAttempts = 0;
                return;
            }

            if (!targetElement) {
                thumbnailInsertionAttempts++;
                if (thumbnailInsertionAttempts < MAX_ATTEMPTS) {
                    setTimeout(attemptInsertion, RETRY_DELAY);
                } else {
                    thumbnailInsertionAttempts = 0;
                }
                return;
            }

            const container = document.createElement("div");
            container.id = "thumbnailPreview-custom-container";
            container.style.cssText = `
                position: relative;
                width: 100%;
                margin-bottom: 10px;
                box-sizing: border-box;
            `;

            const img = document.createElement("img");
            img.src = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/mqdefault.jpg`;
            img.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 10px;
                cursor: pointer;
                display: block;
            `;

            img.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                const maxResUrl = `https://i.ytimg.com/vi/${thumbnailPreviewCurrentVideoId}/maxresdefault.jpg`;
                window.open(maxResUrl, '_blank');
            });

            const closeButton = document.createElement("div");
            closeButton.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 1001;
                transition: all 0.2s ease;
            `;

            const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            closeSvg.setAttribute('width', '20');
            closeSvg.setAttribute('height', '20');
            closeSvg.setAttribute('viewBox', '0 0 24 24');
            closeSvg.setAttribute('fill', 'none');
            closeSvg.setAttribute('stroke', 'currentColor');
            closeSvg.setAttribute('stroke-width', '2');
            closeSvg.setAttribute('stroke-linecap', 'round');
            closeSvg.setAttribute('stroke-linejoin', 'round');

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '12');
            circle.setAttribute('cy', '12');
            circle.setAttribute('r', '10');
            closeSvg.appendChild(circle);

            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('d', 'm15 9-6 6');
            closeSvg.appendChild(path1);

            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'm9 9 6 6');
            closeSvg.appendChild(path2);

            closeButton.appendChild(closeSvg);

            closeButton.onmouseenter = () => closeSvg.style.stroke = '#f50057';
            closeButton.onmouseleave = () => closeSvg.style.stroke = 'currentColor';
            
            closeButton.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                thumbnailPreviewClosed = true;
                container.remove();
            });

            container.appendChild(img);
            container.appendChild(closeButton);
            targetElement.parentNode.insertBefore(container, targetElement);
            thumbnailInsertionAttempts = 0;
        }

        attemptInsertion();
    }

    function createThumbnailOverlay(videoId, container) {
        const overlay = document.createElement('div');
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'white');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.transition = 'stroke 0.2s ease';
        
        const mainRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mainRect.setAttribute('width', '18');
        mainRect.setAttribute('height', '18');
        mainRect.setAttribute('x', '3');
        mainRect.setAttribute('y', '3');
        mainRect.setAttribute('rx', '2');
        mainRect.setAttribute('ry', '2');
        svg.appendChild(mainRect);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '9');
        circle.setAttribute('cy', '9');
        circle.setAttribute('r', '2');
        svg.appendChild(circle);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21');
        svg.appendChild(path);
        
        overlay.appendChild(svg);
          overlay.style.cssText = `
            position: absolute;
            bottom: 8px;
            left: 8px;
            background: rgba(0, 0, 0, 0.7);
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.2s ease;
        `;
        
        overlay.onmouseenter = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            svg.style.stroke = '#f50057';
        };
        overlay.onmouseleave = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            svg.style.stroke = 'white';
        };
        
        overlay.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isShorts = container.closest('ytm-shorts-lockup-view-model') || 
                           container.closest('.shortsLockupViewModelHost') ||
                           container.closest('[class*="shortsLockupViewModelHost"]') ||
                           container.querySelector('a[href*="/shorts/"]');
            
            await openThumbnail(videoId, !!isShorts, overlay);
        };
        
        return overlay;
    }

    function addThumbnailOverlay(container) {
        if (container.querySelector('.thumb-overlay')) return;

        let videoId = null;
        let thumbnailContainer = null;
        
        const img = container.querySelector('img[src*="ytimg.com"]');
        if (img?.src) {
            videoId = extractVideoId(img.src);
            thumbnailContainer = img.closest('yt-thumbnail-view-model') || img.parentElement;
        }
        
        if (!videoId) {
            const link = container.querySelector('a[href*="/shorts/"]');
            if (link?.href) {
                videoId = extractShortsId(link.href);
                
                const shortsImg = container.querySelector('img[src*="ytimg.com"]');
                if (shortsImg) {
                    thumbnailContainer = shortsImg.closest('.ytCoreImageHost') || 
                                       shortsImg.closest('[class*="ThumbnailContainer"]') ||
                                       shortsImg.closest('[class*="ImageHost"]') ||
                                       shortsImg.parentElement;
                }
            }
        }

        if (!videoId || !thumbnailContainer) return;

        if (getComputedStyle(thumbnailContainer).position === 'static') {
            thumbnailContainer.style.position = 'relative';
        }
          const overlay = createThumbnailOverlay(videoId, container);
        overlay.className = 'thumb-overlay';
        thumbnailContainer.appendChild(overlay);

        thumbnailContainer.onmouseenter = () => overlay.style.opacity = '1';
        thumbnailContainer.onmouseleave = () => overlay.style.opacity = '0';
    }

    function createAvatarOverlay() {
        const overlay = document.createElement('div');
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'white');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.transition = 'stroke 0.2s ease';
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '8');
        circle.setAttribute('r', '5');
        svg.appendChild(circle);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M20 21a8 8 0 0 0-16 0');
        svg.appendChild(path);
        
        overlay.appendChild(svg);
        
        overlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.7);
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.2s ease;
        `;
        
        overlay.onmouseenter = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            svg.style.stroke = '#f50057';
        };
        overlay.onmouseleave = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            svg.style.stroke = 'white';
        };
        
        return overlay;
    }

    function addAvatarOverlay(img) {
        const container = img.parentElement;
        if (container.querySelector('.avatar-overlay')) return;

        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        const overlay = createAvatarOverlay();
        overlay.className = 'avatar-overlay';
        
        overlay.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const highResUrl = img.src.replace(/=s\d+-c-k-c0x00ffffff-no-rj.*/, '=s0');
            window.open(highResUrl, '_blank');
        };

        container.appendChild(overlay);

        container.onmouseenter = () => overlay.style.opacity = '1';
        container.onmouseleave = () => overlay.style.opacity = '0';
    }

    function createBannerOverlay() {
        const overlay = document.createElement('div');
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'white');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.transition = 'stroke 0.2s ease';
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '3');
        rect.setAttribute('y', '3');
        rect.setAttribute('width', '18');
        rect.setAttribute('height', '18');
        rect.setAttribute('rx', '2');
        rect.setAttribute('ry', '2');
        svg.appendChild(rect);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '9');
        circle.setAttribute('cy', '9');
        circle.setAttribute('r', '2');
        svg.appendChild(circle);
        
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '21,15 16,10 5,21');
        svg.appendChild(polyline);
        
        overlay.appendChild(svg);
        
        overlay.style.cssText = `
            position: absolute;
            bottom: 8px;
            left: 8px;
            background: rgba(0, 0, 0, 0.7);
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transition: all 0.2s ease;
        `;
        
        overlay.onmouseenter = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.9)';
            svg.style.stroke = '#f50057';
        };
        overlay.onmouseleave = () => {
            overlay.style.background = 'rgba(0, 0, 0, 0.7)';
            svg.style.stroke = 'white';
        };
        
        return overlay;
    }

    function addBannerOverlay(img) {
        const container = img.parentElement;
        if (container.querySelector('.banner-overlay')) return;

        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }

        const overlay = createBannerOverlay();
        overlay.className = 'banner-overlay';
        
        overlay.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const highResUrl = img.src.replace(/=w\d+-.*/, '=s0');
            window.open(highResUrl, '_blank');
        };

        container.appendChild(overlay);

        container.onmouseenter = () => overlay.style.opacity = '1';
        container.onmouseleave = () => overlay.style.opacity = '0';
    }

    function processAvatars() {
        const avatarSelectors = [
            'yt-avatar-shape img',
            '#avatar img',
            'ytd-channel-avatar-editor img',
            '.ytd-video-owner-renderer img[src*="yt"]'
        ];

        avatarSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                if (img.src && img.src.includes('yt') && !img.closest('.avatar-overlay')) {
                    addAvatarOverlay(img);
                }
            });
        });
    }

    function processBanners() {
        const bannerSelectors = [
            'yt-image-banner-view-model img',
            'ytd-c4-tabbed-header-renderer img[src*="yt"]',
            '#channel-header img[src*="banner"]'
        ];

        bannerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(img => {
                if (img.src && (img.src.includes('banner') || img.src.includes('yt')) && !img.closest('.banner-overlay')) {
                    addBannerOverlay(img);
                }
            });
        });
    }

    function processThumbnails() {
        document.querySelectorAll('yt-thumbnail-view-model').forEach(addThumbnailOverlay);
        document.querySelectorAll('.ytd-thumbnail').forEach(addThumbnailOverlay);
        
        document.querySelectorAll('ytm-shorts-lockup-view-model').forEach(addThumbnailOverlay);
        document.querySelectorAll('.shortsLockupViewModelHost').forEach(addThumbnailOverlay);
        document.querySelectorAll('[class*="shortsLockupViewModelHost"]').forEach(addThumbnailOverlay);
    }

    function processAll() {
        processThumbnails();
        processAvatars();
        processBanners();
        addOrUpdateThumbnailImage();
    }

    function setupMutationObserver() {
        const observer = new MutationObserver(() => {
            setTimeout(processAll, 50);
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function setupUrlChangeDetection() {
        let currentUrl = location.href;

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        history.pushState = function () {
            originalPushState.apply(history, arguments);
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOrUpdateThumbnailImage, 500);
                }
            }, 100);
        };

        history.replaceState = function () {
            originalReplaceState.apply(history, arguments);
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOrUpdateThumbnailImage, 500);
                }
            }, 100);
        };

        window.addEventListener("popstate", function () {
            setTimeout(() => {
                if (location.href !== currentUrl) {
                    currentUrl = location.href;
                    setTimeout(addOrUpdateThumbnailImage, 500);
                }
            }, 100);
        });

        setInterval(function () {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                setTimeout(addOrUpdateThumbnailImage, 300);
            }
        }, 500);
    }

    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(init, 100);
            });
        } else {
            setTimeout(init, 100);
        }
    }

    function init() {
        setupUrlChangeDetection();
        setupMutationObserver();
        processAll();
        setTimeout(processAll, 500);
        setTimeout(processAll, 1000);
        setTimeout(processAll, 2000);
    }

    initialize();
    
})();