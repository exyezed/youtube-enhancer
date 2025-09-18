// ==UserScript==
// @name         YouTube Enhancer (Reveal Views & Upload Time)
// @description  Reveal Views & Upload Time for videos and Shorts.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      1.5
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';    
    const badgeStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        
        #secondary-inner .revealViewsAndUploadTime {
            height: 36px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            padding: 0 16px;
            font-family: inherit;
            border: 1px solid transparent;
            margin-bottom: 10px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
        }

        html[dark] #secondary-inner .revealViewsAndUploadTime {
            background-color: #ffffff1a;
            color: var(--yt-spec-text-primary, #fff);
        }

        html:not([dark]) #secondary-inner .revealViewsAndUploadTime {
            background-color: #0000000d;
            color: var(--yt-spec-text-primary, #030303);
        }

        html[dark] #secondary-inner .revealViewsAndUploadTime:hover {
            background-color: #ffffff33;
        }

        html:not([dark]) #secondary-inner .revealViewsAndUploadTime:hover {
            background-color: #00000014;
        }

        #secondary-inner .revealViewsAndUploadTime .separator {
            margin: 0 2px;
            width: 1px;
            height: 24px;
            opacity: 0.3;
        }

        html[dark] #secondary-inner .revealViewsAndUploadTime .separator {
            background-color: var(--yt-spec-text-secondary, #aaa);
        }

        html:not([dark]) #secondary-inner .revealViewsAndUploadTime .separator {
            background-color: var(--yt-spec-text-secondary, #606060);
        }
            
        .shorts-upload-date-injected {
            color: rgb(255, 255, 255);
            font-family: "Roboto", Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 8px;
            padding: 4px 12px;
            opacity: 0.8;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            backdrop-filter: blur(8px);
            width: fit-content;
            max-width: 90%;
            word-wrap: break-word;
            display: flex;
            align-items: center;
            gap: 6px;
        }
          
        .shorts-upload-date-injected .material-symbols-outlined {
            font-size: 18px;
            opacity: 0.9;
        }

        .shorts-views-injected {
            color: rgb(255, 255, 255);
            font-family: "Roboto", Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 8px;
            padding: 4px 12px;
            opacity: 0.8;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            backdrop-filter: blur(8px);
            width: fit-content;
            max-width: 90%;
            word-wrap: break-word;
            display: flex;
            align-items: center;
            gap: 6px;
        }
          
        .shorts-views-injected .material-symbols-outlined {
            font-size: 18px;
            opacity: 0.9;
        }

        .shorts-age-injected {
            color: rgb(255, 255, 255);
            font-family: "Roboto", Arial, sans-serif;
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 8px;
            padding: 4px 12px;
            opacity: 0.8;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 4px;
            backdrop-filter: blur(8px);
            width: fit-content;
            max-width: 90%;
            word-wrap: break-word;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .shorts-age-injected .material-symbols-outlined {
            font-size: 18px;
            opacity: 0.9;
        }

        .material-symbols-outlined {
            font-size: 24px;
            line-height: 1;
            font-variation-settings:
                'FILL' 0,
                'wght' 150,
                'GRAD' 0,
                'opsz' 24;
        }
    `;

    function createBadge(viewCount, uploadTime, uploadDate) {
        const badge = document.createElement('div');
        badge.className = 'revealViewsAndUploadTime';

        const mainIcon = document.createElement('span');
        mainIcon.className = 'material-symbols-outlined';
        mainIcon.textContent = 'visibility';

        const dataSpan = document.createElement('span');
        dataSpan.textContent = viewCount;

        const separator = document.createElement('div');
        separator.className = 'separator';

        const timeIcon = document.createElement('span');
        timeIcon.className = 'material-symbols-outlined';
        timeIcon.textContent = 'schedule';

        const timeSpan = document.createElement('span');
        timeSpan.textContent = uploadTime;

        badge.appendChild(mainIcon);
        badge.appendChild(dataSpan);
        badge.appendChild(separator);
        badge.appendChild(timeIcon);
        badge.appendChild(timeSpan);

        let isShowingViews = true;
        badge.addEventListener('click', () => {
            if (isShowingViews) {
                mainIcon.textContent = 'calendar_month';
                dataSpan.textContent = uploadDate;
                timeIcon.textContent = 'schedule';
                timeIcon.style.display = '';
            } else {
                mainIcon.textContent = 'visibility';
                dataSpan.textContent = viewCount;
                timeIcon.textContent = 'schedule';
                timeIcon.style.display = '';
            }
            isShowingViews = !isShowingViews;
        });

        return badge;
    }    
    
    function getVideoId() {
        const urlObj = new URL(window.location.href);
        if (urlObj.pathname.includes('/watch')) {
            return urlObj.searchParams.get('v');
        } else if (urlObj.pathname.includes('/video/')) {
            return urlObj.pathname.split('/video/')[1];
        } else if (urlObj.pathname.includes('/shorts/')) {
            return urlObj.pathname.split('/shorts/')[1];
        }
        return null;
    }

    function isOnShortsPage() {
        return window.location.pathname.includes('/shorts/');
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }    
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            const options = {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            };
            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
            const [dayName, datePart] = formattedDate.split(', ');
            return `${dayName}, ${datePart.replace(/\//g, '/')}`;
        }
    }    
    
    function formatDateForShorts(dateString) {
        const date = new Date(dateString);
        const dateOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
        
        return `${formattedDate} • ${formattedTime}`;
    }

    function formatUploadAge(dateString) {
        const uploadDate = new Date(dateString);
        const now = new Date();
        const diffInMs = now - uploadDate;
        
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
        
        if (diffInYears > 0) {
            return `${diffInYears}y ago`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths}mo ago`;
        } else if (diffInWeeks > 0) {
            return `${diffInWeeks}w ago`;
        } else if (diffInDays > 0) {
            const remainingHours = diffInHours % 24;
            if (remainingHours > 0) {
                return `${diffInDays}d ${remainingHours}h ago`;
            } else {
                return `${diffInDays}d ago`;
            }
        } else if (diffInHours > 0) {
            const remainingMinutes = diffInMinutes % 60;
            if (remainingMinutes > 0) {
                return `${diffInHours}h ${remainingMinutes}m ago`;
            } else {
                return `${diffInHours}h ago`;
            }
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    function getApiKey() {
        const scripts = document.getElementsByTagName('script');
        for (const script of scripts) {
            const match = script.textContent.match(/"INNERTUBE_API_KEY":\s*"([^"]+)"/);
            if (match && match[1]) return match[1];
        }
        return null;
    }

    function getClientInfo() {
        const scripts = document.getElementsByTagName('script');
        let clientName = null;
        let clientVersion = null;
        
        for (const script of scripts) {
            const nameMatch = script.textContent.match(/"INNERTUBE_CLIENT_NAME":\s*"([^"]+)"/);
            const versionMatch = script.textContent.match(/"INNERTUBE_CLIENT_VERSION":\s*"([^"]+)"/);
            
            if (nameMatch && nameMatch[1]) clientName = nameMatch[1];
            if (versionMatch && versionMatch[1]) clientVersion = versionMatch[1];
        }
        
        return { clientName, clientVersion };
    }

    async function fetchVideoInfo(videoId) {
        try {
            const apiKey = getApiKey();
            if (!apiKey) return null;
            
            const { clientName, clientVersion } = getClientInfo();
            if (!clientName || !clientVersion) return null;
            
            const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoId: videoId,
                    context: {
                        client: {
                            clientName: clientName,
                            clientVersion: clientVersion,
                        }
                    }
                })
            });
            
            if (!response.ok) return null;
            const data = await response.json();
            
            let viewCount = "Unknown";
            if (data.videoDetails?.viewCount) {
                viewCount = formatNumber(data.videoDetails.viewCount);
            }
            
            let publishDate = "Unknown";
            if (data.microformat?.playerMicroformatRenderer?.publishDate) {
                publishDate = data.microformat.playerMicroformatRenderer.publishDate;
            }
            
            return {
                viewCount,
                uploadDate: publishDate
            };
        } catch (error) {
            return null;
        }
    }

    function updateBadge(viewCount, uploadTime, uploadDate) {
        let badge = document.querySelector('.revealViewsAndUploadTime');
        if (badge) {
            badge.remove();
        }
        insertBadge(viewCount, uploadTime, uploadDate);
    }

    function insertBadge(viewCount, uploadTime, uploadDate) {
        const targetElement = document.querySelector('#secondary-inner #panels');
        if (targetElement && !document.querySelector('.revealViewsAndUploadTime')) {
            const badge = createBadge(viewCount, uploadTime, uploadDate);
            targetElement.parentNode.insertBefore(badge, targetElement);
        }
    }    
    
    function addStyles() {
        if (!document.querySelector('#revealViewsAndUploadTime-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'revealViewsAndUploadTime-styles';
            styleElement.textContent = badgeStyles;
            document.head.appendChild(styleElement);
        }
    }

    const state = {
        currentVideoId: null,
        injectionInProgress: false,
        shortsObserver: null,
        lastUrl: location.href,
        wasOnShortsPage: isOnShortsPage()
    };

    const SHORTS_CONFIG = {
        className: 'shorts-upload-date-injected',
        viewsClassName: 'shorts-views-injected',
        ageClassName: 'shorts-age-injected',
        selectors: {
            metapanel: '#metapanel, .ytReelMetapanelViewModelHost, yt-reel-metapanel-view-model'
        }
    };

    const utils = {
        log: (message, type = 'info') => {
            const prefix = '[YouTube Enhancer]';
            console[type](`${prefix} ${message}`);
        },
        
        querySelector: (selectors) => {
            return selectors.split(', ').reduce((found, selector) => {
                return found || document.querySelector(selector.trim());
            }, null);
        },

        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    const createElement = (type, className, iconName, text) => {
        const element = document.createElement('div');
        element.className = className;
        
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.textContent = iconName;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        
        element.appendChild(icon);
        element.appendChild(textSpan);
        
        return element;
    };

    const createShortsUploadElement = (uploadDate) => createElement('shorts', SHORTS_CONFIG.className, 'calendar_clock', uploadDate);
    const createShortsViewsElement = (viewCount) => createElement('shorts', SHORTS_CONFIG.viewsClassName, 'visibility', viewCount);
    const createShortsAgeElement = (uploadAge) => createElement('shorts', SHORTS_CONFIG.ageClassName, 'schedule', uploadAge);
    const getShortsElements = () => ({
        upload: document.querySelector(`.${SHORTS_CONFIG.className}`),
        views: document.querySelector(`.${SHORTS_CONFIG.viewsClassName}`),
        age: document.querySelector(`.${SHORTS_CONFIG.ageClassName}`)
    });

    const isShortsAlreadyInjected = () => getShortsElements().upload !== null;    const injectShortsUploadDate = async () => {
        const videoId = getVideoId();
        
        if (!videoId) {
            utils.log('No video ID found', 'warn');
            return false;
        }
        
        if (state.injectionInProgress && state.currentVideoId === videoId) {
            utils.log('Injection already in progress for this video');
            return false;
        }
        
        const targetElement = utils.querySelector(SHORTS_CONFIG.selectors.metapanel);
        
        if (!targetElement) {
            utils.log('Target element not found, retrying...', 'warn');
            setTimeout(() => injectShortsUploadDate(), 200);
            return false;
        }

        if (state.currentVideoId === videoId && isShortsAlreadyInjected()) {
            utils.log('Elements already exist for current video');
            return true;
        }
        
        if (state.currentVideoId !== videoId) {
            cleanupShortsElements();
            state.currentVideoId = videoId;
        }
        
        if (!isShortsAlreadyInjected()) {
            const uploadElement = createShortsUploadElement('Loading...');
            const ageElement = createShortsAgeElement('Loading...');
            const viewsElement = createShortsViewsElement('Loading...');
            
            targetElement.insertBefore(uploadElement, targetElement.firstChild);
            targetElement.insertBefore(ageElement, uploadElement.nextSibling);
            targetElement.insertBefore(viewsElement, ageElement.nextSibling);
            
            utils.log('Loading elements created');
        }
        
        state.injectionInProgress = true;

        try {
            const videoInfo = await fetchVideoInfo(videoId);
            const elements = getShortsElements();
            
            if (videoInfo && videoInfo.uploadDate !== "Unknown") {
                if (elements.upload) {
                    const formattedDate = formatDateForShorts(videoInfo.uploadDate);
                    elements.upload.querySelector('span:last-child').textContent = formattedDate;
                }
                
                if (elements.age) {
                    const uploadAge = formatUploadAge(videoInfo.uploadDate);
                    elements.age.querySelector('span:last-child').textContent = uploadAge;
                }
                
                if (elements.views && videoInfo.viewCount && videoInfo.viewCount !== "Unknown") {
                    elements.views.querySelector('span:last-child').textContent = videoInfo.viewCount;
                }
                
                utils.log('Upload date and views successfully updated');
                state.injectionInProgress = false;
                return true;
            } else {
                Object.values(elements).forEach(element => {
                    if (element) element.querySelector('span:last-child').textContent = 'Error';
                });
                
                utils.log('Could not fetch video info', 'warn');
                state.injectionInProgress = false;
                return false;
            }
        } catch (error) {
            const elements = getShortsElements();
            Object.values(elements).forEach(element => {
                if (element) element.querySelector('span:last-child').textContent = 'Error';
            });
            
            utils.log('Error fetching video info: ' + error.message, 'error');
            state.injectionInProgress = false;
            return false;
        }
    };    
    
    const handleShortsMutations = utils.debounce((mutations) => {
        const videoId = getVideoId();
        if (!videoId) return;
        
        let shouldInject = false;
        
        if (state.currentVideoId !== videoId) {
            shouldInject = true;
        } else {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const hasMetapanel = node.matches?.(SHORTS_CONFIG.selectors.metapanel.split(', ')[0]) ||
                                               node.querySelector?.(SHORTS_CONFIG.selectors.metapanel);
                            if (hasMetapanel) shouldInject = true;
                        }
                    });
                }
            });
        }
        
        if (shouldInject) {
            setTimeout(() => injectShortsUploadDate(), 200);
        }
    }, 100);    
    
    const startShortsObserver = () => {
        if (state.shortsObserver) return;
        
        state.shortsObserver = new MutationObserver(handleShortsMutations);
        state.shortsObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false
        });
        
        utils.log('MutationObserver started');
    };

    const stopShortsObserver = () => {
        if (state.shortsObserver) {
            state.shortsObserver.disconnect();
            state.shortsObserver = null;
            utils.log('MutationObserver stopped');
        }
    };

    const cleanupShortsElements = () => {
        const selectors = [
            `.${SHORTS_CONFIG.className}`,
            `.${SHORTS_CONFIG.viewsClassName}`,
            `.${SHORTS_CONFIG.ageClassName}`
        ];
        
        let cleanedCount = 0;
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => element.remove());
            cleanedCount += elements.length;
        });
        
        utils.log(`Cleaned up ${cleanedCount} existing elements`);
        state.currentVideoId = null;
        state.injectionInProgress = false;
    };

    const initShortsFeature = () => {
        utils.log('Starting Shorts Upload Date Feature');
        
        state.injectionInProgress = false;
        state.currentVideoId = null;
        
        cleanupShortsElements();
        setTimeout(() => injectShortsUploadDate(), 300);
        startShortsObserver();
    };

    const stopShortsFeature = () => {
        utils.log('Stopping Shorts Upload Date Feature');
        stopShortsObserver();
        cleanupShortsElements();
    };
    
    async function updateBadgeWithInfo(videoId) {
        updateBadge('Loading...', 'Loading...', 'Loading...');
        
        try {
            const videoInfo = await fetchVideoInfo(videoId);
            if (videoInfo) {
                const uploadTime = formatTime(videoInfo.uploadDate);
                const formattedUploadDate = formatDate(videoInfo.uploadDate);
                updateBadge(videoInfo.viewCount, uploadTime, formattedUploadDate);
            } else {
                updateBadge('Error', 'Error', 'Error');
            }
        } catch (error) {
            updateBadge('Error', 'Error', 'Error');
        }
    }
    
    function init() {
        addStyles();
        
        if (isOnShortsPage()) {
            initShortsFeature();
        } else {
            const videoId = getVideoId();
            if (videoId) {
                updateBadgeWithInfo(videoId);
            } else {
                updateBadge('N/A', 'N/A', 'N/A');
            }
        }
    }        
    
    function observePageChanges() {
        let lastVideoId = getVideoId();

        const observer = new MutationObserver(() => {
            if (location.href !== state.lastUrl) {
                state.lastUrl = location.href;
                const currentVideoId = getVideoId();
                const isCurrentlyOnShortsPage = isOnShortsPage();
                
                if (state.wasOnShortsPage !== isCurrentlyOnShortsPage) {
                    if (state.wasOnShortsPage) {
                        stopShortsFeature();
                    } else {
                        updateBadge('', '', '');
                    }
                    state.wasOnShortsPage = isCurrentlyOnShortsPage;
                    lastVideoId = null;
                }
                
                if (isCurrentlyOnShortsPage) {
                    if (currentVideoId && currentVideoId !== lastVideoId) {
                        lastVideoId = currentVideoId;
                        state.injectionInProgress = false;
                        setTimeout(() => injectShortsUploadDate(), 300);
                    }
                } else {
                    if (currentVideoId && currentVideoId !== lastVideoId) {
                        lastVideoId = currentVideoId;
                        updateBadgeWithInfo(currentVideoId);
                    } else if (!currentVideoId) {
                        updateBadge('Not a video', 'Not a video', 'Not a video');
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            observePageChanges();
        });
    } else {
        init();
        observePageChanges();
    }    
    
    window.addEventListener('yt-navigate-start', function() {
        if (isOnShortsPage()) {
            cleanupShortsElements();
        } else {
            updateBadge('Loading...', 'Loading...', 'Loading...');
        }
    });    
    
    window.addEventListener('yt-navigate-finish', function() {
        setTimeout(() => {
            if (isOnShortsPage()) {
                state.injectionInProgress = false;
                setTimeout(() => injectShortsUploadDate(), 300);
            } else {
                const videoId = getVideoId();
                if (videoId) {
                    updateBadgeWithInfo(videoId);
                } else {
                    updateBadge('Not a video', 'Not a video', 'Not a video');
                }
            }
        }, 100);
    });
})();