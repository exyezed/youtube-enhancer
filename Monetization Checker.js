// ==UserScript==
// @name         YouTube Enhancer (Monetization Checker)
// @description  Check the Monetization Status.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      1.9
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @connect      monet-check.pages.dev
// ==/UserScript==

(function () {
  "use strict";
  let lastCheckedUrl = "";
  let lastCheckedChannelId = null;
  let isCheckingMonetization = false;
  let checkQueue = Promise.resolve();
  const API_ENDPOINT = "https://monet-check.pages.dev";
  let statusCache = {};

  function addGlobalStyles() {
    const styleElement = document.createElement('style');
    styleElement.id = 'yt-monetization-global-styles';
    styleElement.textContent = `
      ytd-channel-name {
        display: flex !important;
        align-items: center !important;
        flex-wrap: wrap !important;
      }
      
      ytd-channel-name #container {
        display: flex !important;
        align-items: center !important;
      }
      
      ytd-channel-name ytd-badge-supported-renderer {
        display: flex !important;
        align-items: center !important;
      }
      
      .yt-video-monetization-icon {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-left: 4px !important;
        height: 15px !important;
        position: relative !important;
        top: 0 !important;
      }
      
      .yt-video-monetization-icon svg {
        width: 15px !important;
        height: 15px !important;
        display: block !important;
      }
      
      .yt-monetization-icon {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-left: 8px !important;
        height: 20px !important;
        position: relative !important;
      }
      
      .yt-monetization-icon svg {
        width: 20px !important;
        height: 20px !important;
        display: block !important;
      }
        .dynamic-text-view-model-wiz__h1 {
        display: flex !important;
        align-items: center !important;
      }
      
      .dynamic-text-view-model-wiz__h1 .yt-core-attributed-string {
        display: flex !important;
        align-items: center !important;
      }
      
      .dynamicTextViewModelH1 {
        display: flex !important;
        align-items: center !important;
      }
      
      .dynamicTextViewModelH1 .yt-core-attributed-string {
        display: flex !important;
        align-items: center !important;
      }
    `;
    document.head.appendChild(styleElement);
  }

  addGlobalStyles();

  const commonIconStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "8px",
    height: "20px",
    cursor: "pointer"
  };
  
  const videoIconStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "4px",
    height: "15px",
    cursor: "pointer"
  };

  function createMonetizationIcon(isMonetized, isVideo = false) {
    const container = document.createElement("div");
    Object.assign(container.style, isVideo ? videoIconStyles : commonIconStyles);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512 512");
    svg.setAttribute("fill", "none");
    
    if (isVideo) {
      svg.setAttribute("width", "15");
      svg.setAttribute("height", "15");
    } else {
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
    }
    
    svg.style.display = "block";

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm20.8-378.4l0 14.2c9.7 1.2 19.4 3.9 29 6.6c1.9 .5 3.7 1 5.6 1.6c11.5 3.2 18.3 15.1 15.1 26.6s-15.1 18.2-26.6 15.1c-1.6-.4-3.1-.9-4.7-1.3c-7-2-14-3.9-21.1-5.3c-13.2-2.5-28.5-1.3-40.8 4c-11 4.8-20.1 16.4-7.6 24.4c9.8 6.3 21.8 9.5 33.2 12.6c2.4 .6 4.7 1.3 7 1.9c15.6 4.4 35.5 10.1 50.4 20.3c19.4 13.3 28.5 34.9 24.2 58.1c-4.1 22.4-19.7 37.1-38.4 44.7c-7.8 3.2-16.3 5.2-25.2 6.2l0 15.2c0 11.9-9.7 21.6-21.6 21.6s-21.6-9.7-21.6-21.6l0-17.4c-14.5-3.3-28.7-7.9-42.8-12.5c-11.3-3.7-17.5-16-13.7-27.3s16-17.5 27.3-13.7c2.5 .8 5 1.7 7.5 2.5c11.3 3.8 22.9 7.7 34.5 9.6c17 2.5 30.6 1 39.5-2.6c12-4.8 17.7-19.1 5.9-27.1c-10.1-6.9-22.6-10.3-34.5-13.5c-2.3-.6-4.5-1.2-6.8-1.9c-15.1-4.3-34-9.6-48.2-18.7c-19.5-12.5-29.4-33.3-25.2-56.4c4-21.8 21-36.3 39-44.1c5.5-2.4 11.4-4.3 17.5-5.7l0-16.1c0-11.9 9.7-21.6 21.6-21.6s21.6 9.7 21.6 21.6z"
    );
    path.setAttribute("fill", isMonetized ? "#16a34a" : "#dc2626");

    svg.appendChild(path);
    container.appendChild(svg);

    return container;
  }

  function createSpinnerIcon(isVideo = false) {
    const container = document.createElement("div");
    Object.assign(container.style, isVideo ? videoIconStyles : commonIconStyles);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 512 512");
    
    if (isVideo) {
      svg.setAttribute("width", "15");
      svg.setAttribute("height", "15");
    } else {
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
    }
    
    svg.style.display = "block";
    svg.style.animation = "yt-monetization-spinner-rotate 1.5s linear infinite";

    if (!document.querySelector("#yt-monetization-spinner-style")) {
      const style = document.createElement("style");
      style.id = "yt-monetization-spinner-style";
      style.textContent = `
        @keyframes yt-monetization-spinner-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    const secondaryPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    secondaryPath.setAttribute(
      "d",
      "M0 256C0 114.9 114.1 .5 255.1 0C237.9 .5 224 14.6 224 32c0 17.7 14.3 32 32 32C150 64 64 150 64 256s86 192 192 192c69.7 0 130.7-37.1 164.5-92.6c-3 6.6-3.3 14.8-1 22.2c1.2 3.7 3 7.2 5.4 10.3c1.2 1.5 2.6 3 4.1 4.3c.8 .7 1.6 1.3 2.4 1.9c.4 .3 .8 .6 1.3 .9s.9 .6 1.3 .8c5 2.9 10.6 4.3 16 4.3c11 0 21.8-5.7 27.7-16c-44.3 76.5-127 128-221.7 128C114.6 512 0 397.4 0 256z"
    );
    secondaryPath.setAttribute("fill", "#ffffff");
    secondaryPath.setAttribute("opacity", "0.4");

    const primaryPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    primaryPath.setAttribute(
      "d",
      "M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"
    );
    primaryPath.setAttribute("fill", "#ffffff");

    svg.appendChild(secondaryPath);
    svg.appendChild(primaryPath);
    container.appendChild(svg);

    return container;
  }

  function extractChannelIdFromVideoPage() {
    const channelLinks = document.querySelectorAll('a.ytd-channel-name, ytd-video-owner-renderer a');
    
    for (const link of channelLinks) {
      const href = link.getAttribute('href');
      if (href) {
        if (href.includes('/channel/')) {
          return href.split('/channel/')[1].split('/')[0];
        }
        if (href.includes('/@')) {
          return '@' + href.split('/@')[1].split('/')[0];
        }
      }
    }
    
    const ownerRenderer = document.querySelector('ytd-video-owner-renderer');
    if (ownerRenderer) {
      const channelLink = ownerRenderer.querySelector('a');
      if (channelLink) {
        const href = channelLink.getAttribute('href');
        if (href) {
          if (href.includes('/channel/')) {
            return href.split('/channel/')[1].split('/')[0];
          }
          if (href.includes('/@')) {
            return '@' + href.split('/@')[1].split('/')[0];
          }
        }
      }
    }
    
    return null;
  }

  function extractChannelIdentifier() {
    const url = window.location.href;
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    if (pathname === '/watch') {
      const channelId = extractChannelIdFromVideoPage();
      if (channelId) {
        return channelId;
      }
    }
    
    if (pathname.includes('/channel/')) {
      return pathname.split('/channel/')[1].split('/')[0];
    }
    
    if (pathname.includes('/@')) {
      return '@' + pathname.split('/@')[1].split('/')[0];
    }
    
    return null;
  }
  
  function extractVideoId() {
    const url = window.location.href;
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const searchParams = urlObj.searchParams;
    
    if (pathname === '/watch') {
      return searchParams.get('v');
    }
    
    if (pathname.startsWith('/shorts/')) {
      return pathname.split('/shorts/')[1].split('/')[0];
    }
    
    return null;
  }
  
  function isVideoPage() {
    const url = window.location.href;
    return url.includes('/watch') || url.includes('/shorts/');
  }
  
  function isShortsPage() {
    const url = window.location.href;
    return url.includes('/shorts/');
  }
  
  function isChannelPage() {
    const channelIdentifier = extractChannelIdentifier();
    return channelIdentifier !== null && !isVideoPage();
  }

  function checkMonetizationStatus(type, id) {
    const cacheKey = `${type}_${id}`;
    
    if (statusCache[cacheKey] !== undefined) {
      return Promise.resolve(statusCache[cacheKey]);
    }
    
    return new Promise((resolve, reject) => {
      const apiUrl = `${API_ENDPOINT}/${type}/${id}`;
      
      GM_xmlhttpRequest({
        method: "GET",
        url: apiUrl,
        timeout: 10000,
        onload: function(response) {
          if (response.status === 200) {
            try {
              const result = JSON.parse(response.responseText);
              const isMonetized = result.monetization === true;
              
              statusCache[cacheKey] = isMonetized;
              
              resolve(isMonetized);
            } catch (error) {
              reject(new Error("Invalid API response"));
            }
          } else {
            reject(new Error(`API request failed: ${response.status}`));
          }
        },
        onerror: function(error) {
          reject(error);
        },
        ontimeout: function() {
          reject(new Error("Request timed out"));
        }
      });
    });
  }

  function queueMonetizationCheck(forceCheck = false) {
    if (isCheckingMonetization && !forceCheck) {
      return;
    }

    checkQueue = checkQueue.then(() => {
      return performMonetizationCheck(forceCheck);
    }).catch((error) => {
      console.error("Error checking monetization:", error);
      isCheckingMonetization = false;
    });
  }

  async function performMonetizationCheck(forceCheck = false) {
    const currentUrl = window.location.href;
    const currentChannelId = extractChannelIdentifier();

    if (currentUrl !== lastCheckedUrl || 
        currentChannelId !== lastCheckedChannelId || 
        forceCheck) {
      lastCheckedUrl = currentUrl;
      lastCheckedChannelId = currentChannelId;
      isCheckingMonetization = false;
    }

    if (isCheckingMonetization) {
      return;
    }

    isCheckingMonetization = true;

    try {
      if (isVideoPage()) {
        const videoId = extractVideoId();
        
        if (!videoId) {
          throw new Error("Could not determine video ID");
        }
        
        await showVideoSpinner();
        
        const endpoint = isShortsPage() ? "shorts" : "video";
        const isMonetized = await checkMonetizationStatus(endpoint, videoId);
        
        await updateVideoPage(isMonetized);
      } 
      else if (isChannelPage()) {
        const channelId = extractChannelIdentifier();
        
        if (!channelId) {
          throw new Error("Could not determine channel ID");
        }
        
        await showChannelSpinner();
        
        const isMonetized = await checkMonetizationStatus("channel", channelId);
        
        await updateChannelPage(isMonetized);
      }
    } catch (error) {
      console.error("Monetization check failed:", error);
      
      if (isVideoPage()) {
        await updateVideoPage(false, true);
      } else if (isChannelPage()) {
        await updateChannelPage(false, true);
      }
    } finally {
      isCheckingMonetization = false;
    }
  }
  function findChannelTitleElement(retryCount = 0, maxRetries = 5) {
    const possibleTitleSelectors = [
      "h1.dynamicTextViewModelH1 > span.yt-core-attributed-string",
      "h1.dynamic-text-view-model-wiz__h1 .yt-core-attributed-string",
      "h1 .yt-core-attributed-string",
      "ytd-channel-name #channel-name",
      "#channel-header-container #channel-name",
    ];

    for (const selector of possibleTitleSelectors) {
      const element = document.querySelector(selector);
      if (element) return element;
    }

    if (retryCount < maxRetries) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(findChannelTitleElement(retryCount + 1, maxRetries));
        }, 500);
      });
    }

    return null;
  }
  
  function findVideoChannelElement(retryCount = 0, maxRetries = 5) {
    const element = document.querySelector("ytd-video-owner-renderer #channel-name");
    
    if (element) return element;
    
    if (retryCount < maxRetries) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(findVideoChannelElement(retryCount + 1, maxRetries));
        }, 500);
      });
    }
    
    return null;
  }

  async function showChannelSpinner() {
    const titleElement = await findChannelTitleElement();
    if (!titleElement) {
      return null;
    }

    const existingIcon = document.querySelector(".yt-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }

    const spinner = createSpinnerIcon(false);
    spinner.classList.add("yt-monetization-icon");

    const channelNameContainer = titleElement.closest('h1') || titleElement.parentNode;
    
    if (channelNameContainer) {
      channelNameContainer.appendChild(spinner);
    } else {
      titleElement.appendChild(spinner);
    }

    return spinner;
  }
  
  async function showVideoSpinner() {
    const channelElement = await findVideoChannelElement();
    if (!channelElement) {
      return null;
    }
    
    const existingIcon = document.querySelector(".yt-video-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }
    
    const spinner = createSpinnerIcon(true);
    spinner.classList.add("yt-video-monetization-icon");
    
    const badgeContainer = channelElement.querySelector("ytd-badge-supported-renderer");
    
    if (badgeContainer) {
      badgeContainer.parentNode.insertBefore(spinner, badgeContainer.nextSibling);
    } else {
      channelElement.appendChild(spinner);
    }
    
    return spinner;
  }

  async function updateChannelPage(isMonetized, isError = false) {
    const titleElement = await findChannelTitleElement();
    if (!titleElement) {
      return;
    }

    const existingIcon = document.querySelector(".yt-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }

    const monetizationIcon = createMonetizationIcon(isMonetized, false);
    monetizationIcon.classList.add("yt-monetization-icon");
    
    if (isError) {
      monetizationIcon.title = "Failed to check monetization status";
    } else {
      monetizationIcon.title = isMonetized ? "Channel is monetized" : "Channel is not monetized";
    }

    const channelNameContainer = titleElement.closest('h1') || titleElement.parentNode;
    
    if (channelNameContainer) {
      channelNameContainer.appendChild(monetizationIcon);
    } else {
      titleElement.appendChild(monetizationIcon);
    }
    
    monetizationIcon.addEventListener('click', () => {
      queueMonetizationCheck(true);
    });
  }
  
  async function updateVideoPage(isMonetized, isError = false) {
    const channelElement = await findVideoChannelElement();
    if (!channelElement) {
      return;
    }
    
    const existingIcon = document.querySelector(".yt-video-monetization-icon");
    if (existingIcon) {
      existingIcon.remove();
    }
    
    const monetizationIcon = createMonetizationIcon(isMonetized, true);
    monetizationIcon.classList.add("yt-video-monetization-icon");
    
    if (isError) {
      monetizationIcon.title = "Failed to check monetization status";
    } else {
      monetizationIcon.title = isMonetized ? "Channel is monetized" : "Channel is not monetized";
    }
    
    const badgeContainer = channelElement.querySelector("ytd-badge-supported-renderer");
    
    if (badgeContainer) {
      badgeContainer.parentNode.insertBefore(monetizationIcon, badgeContainer.nextSibling);
    } else {
      channelElement.appendChild(monetizationIcon);
    }
    
    monetizationIcon.addEventListener('click', () => {
      queueMonetizationCheck(true);
    });
  }

  function setupUrlChangeDetection() {
    let lastPath = window.location.pathname;
    let lastSearch = window.location.search;
    let lastVideoId = extractVideoId();
    let lastChannelId = extractChannelIdentifier();
    let lastHref = window.location.href;
    
    setInterval(() => {
      statusCache = {};
    }, 30 * 60 * 1000);

    function checkForChanges() {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      const currentVideoId = extractVideoId();
      const currentChannelId = extractChannelIdentifier();
      const currentHref = window.location.href;
      
      if (currentPath !== lastPath || 
          currentSearch !== lastSearch || 
          currentVideoId !== lastVideoId ||
          currentChannelId !== lastChannelId ||
          currentHref !== lastHref) {
        
        lastPath = currentPath;
        lastSearch = currentSearch;
        lastVideoId = currentVideoId;
        lastChannelId = currentChannelId;
        lastHref = currentHref;
        
        setTimeout(() => queueMonetizationCheck(true), 500);
      }
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.id === 'content' || 
                  node.id === 'page-manager' || 
                  node.tagName === 'YTD-WATCH-FLEXY' ||
                  node.tagName === 'YTD-BROWSE' ||
                  node.tagName === 'YTD-REEL-WATCH-RENDERER') {
                checkForChanges();
                break;
              }
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      originalPushState.apply(this, arguments);
      setTimeout(checkForChanges, 100);
    };

    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      setTimeout(checkForChanges, 100);
    };

    window.addEventListener("popstate", () => {
      setTimeout(checkForChanges, 100);
    });
    
    setInterval(checkForChanges, 1000);
    
    document.addEventListener('click', (event) => {
      let target = event.target;
      while (target && target !== document) {
        if (target.tagName === 'A' || 
            target.id === 'thumbnail' || 
            target.classList.contains('yt-simple-endpoint')) {
          setTimeout(checkForChanges, 500);
          break;
        }
        target = target.parentNode;
      }
    }, true);
  }

  queueMonetizationCheck(true);
  setupUrlChangeDetection();
  
  window.checkYoutubeMonetization = () => queueMonetizationCheck(true);
})();
