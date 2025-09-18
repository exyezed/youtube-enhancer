// ==UserScript==
// @name         YouTube Enhancer (Loop & Screenshot Buttons)
// @description  Add Loop, Save and Copy Screenshot Buttons.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      1.8
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const buttonConfig = {
    screenshotFormat: "png",
    extension: "png",
    clickDuration: 500,
  };

  const buttonCSS = `
    a.buttonLoopAndScreenshot-loop-button, 
    a.buttonLoopAndScreenshot-save-screenshot-button,
    a.buttonLoopAndScreenshot-copy-screenshot-button {
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
    }

    a.buttonLoopAndScreenshot-loop-button svg, 
    a.buttonLoopAndScreenshot-save-screenshot-button svg,
    a.buttonLoopAndScreenshot-copy-screenshot-button svg {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        transition: fill 0.2s ease;
    }

    a.buttonLoopAndScreenshot-loop-button:hover svg,
    a.buttonLoopAndScreenshot-save-screenshot-button:hover svg,
    a.buttonLoopAndScreenshot-copy-screenshot-button:hover svg {
        fill: url(#buttonGradient);
    }

    a.buttonLoopAndScreenshot-loop-button.active svg,
    a.buttonLoopAndScreenshot-save-screenshot-button.clicked svg,
    a.buttonLoopAndScreenshot-copy-screenshot-button.clicked svg {
        fill: url(#successGradient);
    }    
        
    .buttonLoopAndScreenshot-shorts-save-button,
    .buttonLoopAndScreenshot-shorts-copy-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        margin-bottom: 16px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .buttonLoopAndScreenshot-shorts-save-button svg,
    .buttonLoopAndScreenshot-shorts-copy-button svg {
        width: 24px;
        height: 24px;
        transition: fill 0.1s ease;
    }

    .buttonLoopAndScreenshot-shorts-save-button svg path,
    .buttonLoopAndScreenshot-shorts-copy-button svg path {
        transition: fill 0.1s ease;
    }

    .buttonLoopAndScreenshot-shorts-save-button:hover svg path,
    .buttonLoopAndScreenshot-shorts-copy-button:hover svg path {
        fill: url(#shortsButtonGradient) !important;
    }

    .buttonLoopAndScreenshot-shorts-save-button.clicked svg path,
    .buttonLoopAndScreenshot-shorts-copy-button.clicked svg path {
        fill: url(#shortsSuccessGradient) !important;
    }

    html[dark] .buttonLoopAndScreenshot-shorts-save-button,
    html[dark] .buttonLoopAndScreenshot-shorts-copy-button {
        background-color: rgba(255, 255, 255, 0.1);
    }

    html[dark] .buttonLoopAndScreenshot-shorts-save-button:hover,
    html[dark] .buttonLoopAndScreenshot-shorts-copy-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    html[dark] .buttonLoopAndScreenshot-shorts-save-button svg path,
    html[dark] .buttonLoopAndScreenshot-shorts-copy-button svg path {
        fill: white;
    }

    html:not([dark]) .buttonLoopAndScreenshot-shorts-save-button,
    html:not([dark]) .buttonLoopAndScreenshot-shorts-copy-button {
        background-color: rgba(0, 0, 0, 0.05);
    }

    html:not([dark]) .buttonLoopAndScreenshot-shorts-save-button:hover,
    html:not([dark]) .buttonLoopAndScreenshot-shorts-copy-button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    html:not([dark]) .buttonLoopAndScreenshot-shorts-save-button svg path,
    html:not([dark]) .buttonLoopAndScreenshot-shorts-copy-button svg path {
        fill: #030303;
    }
    `;

  const iconUtils = {
    createGradientDefs(isShortsButton = false) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );

      const hoverGradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      hoverGradient.setAttribute(
        "id",
        isShortsButton ? "shortsButtonGradient" : "buttonGradient"
      );
      hoverGradient.setAttribute("x1", "0%");
      hoverGradient.setAttribute("y1", "0%");
      hoverGradient.setAttribute("x2", "100%");
      hoverGradient.setAttribute("y2", "100%");

      const hoverStop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      hoverStop1.setAttribute("offset", "0%");
      hoverStop1.setAttribute("style", "stop-color:#f03");

      const hoverStop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      hoverStop2.setAttribute("offset", "100%");
      hoverStop2.setAttribute("style", "stop-color:#ff2791");

      hoverGradient.appendChild(hoverStop1);
      hoverGradient.appendChild(hoverStop2);
      defs.appendChild(hoverGradient);

      const successGradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      successGradient.setAttribute(
        "id",
        isShortsButton ? "shortsSuccessGradient" : "successGradient"
      );
      successGradient.setAttribute("x1", "0%");
      successGradient.setAttribute("y1", "0%");
      successGradient.setAttribute("x2", "100%");
      successGradient.setAttribute("y2", "100%");

      const successStop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      successStop1.setAttribute("offset", "0%");
      successStop1.setAttribute("style", "stop-color:#0f9d58");

      const successStop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      successStop2.setAttribute("offset", "100%");
      successStop2.setAttribute("style", "stop-color:#00c853");

      successGradient.appendChild(successStop1);
      successGradient.appendChild(successStop2);
      defs.appendChild(successGradient);

      return defs;
    },

    createBaseSVG(viewBox, fill = "#e8eaed", isShortsButton = false) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("height", "24px");
      svg.setAttribute("viewBox", viewBox);
      svg.setAttribute("width", "24px");
      svg.setAttribute("fill", fill);
      svg.appendChild(this.createGradientDefs(isShortsButton));
      return svg;
    },

    paths: {
      loopPath:
        "M220-260q-92 0-156-64T0-480q0-92 64-156t156-64q37 0 71 13t61 37l68 62-60 54-62-56q-16-14-36-22t-42-8q-58 0-99 41t-41 99q0 58 41 99t99 41q22 0 42-8t36-22l310-280q27-24 61-37t71-13q92 0 156 64t64 156q0 92-64 156t-156 64q-37 0-71-13t-61-37l-68-62 60-54 62 56q16 14 36 22t42 8q58 0 99-41t41-99q0-58-41-99t-99-41q-22 0-42 8t-36 22L352-310q-27 24-61 37t-71 13Z",
      screenshotPath:
        "M20 5h-3.17l-1.24-1.35A2 2 0 0 0 14.12 3H9.88c-.56 0-1.1.24-1.47.65L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-3 12H7a.5.5 0 0 1-.4-.8l2-2.67c.2-.27.6-.27.8 0L11.25 16l2.6-3.47c.2-.27.6-.27.8 0l2.75 3.67a.5.5 0 0 1-.4.8",
      copyScreenshotPath:
        "M9 14h10l-3.45-4.5l-2.3 3l-1.55-2zm-1 4q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V6h2v14h14v2zM8 4h12v12H8z",
    },

    createLoopIcon() {
      const svg = this.createBaseSVG("0 -960 960 960");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", this.paths.loopPath);

      svg.appendChild(path);
      return svg;
    },

    createSaveScreenshotIcon(isShortsButton = false) {
      const svg = this.createBaseSVG("0 0 24 24", "#e8eaed", isShortsButton);

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", this.paths.screenshotPath);

      svg.appendChild(path);
      return svg;
    },

    createCopyScreenshotIcon(isShortsButton = false) {
      const svg = this.createBaseSVG("0 0 24 24", "#e8eaed", isShortsButton);

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", this.paths.copyScreenshotPath);

      svg.appendChild(path);
      return svg;
    },
  };

  const buttonUtils = {
    addStyle(styleString) {
      const style = document.createElement("style");
      style.textContent = styleString;
      document.head.append(style);
    },

    getVideoId() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("v") || window.location.pathname.split("/").pop();
    },

    getApiKey() {
      const scripts = document.getElementsByTagName("script");
      for (const script of scripts) {
        const match = script.textContent.match(
          /"INNERTUBE_API_KEY":\s*"([^"]+)"/
        );
        if (match && match[1]) return match[1];
      }
      return null;
    },

    getClientInfo() {
      const scripts = document.getElementsByTagName("script");
      let clientName = null;
      let clientVersion = null;

      for (const script of scripts) {
        const nameMatch = script.textContent.match(
          /"INNERTUBE_CLIENT_NAME":\s*"([^"]+)"/
        );
        const versionMatch = script.textContent.match(
          /"INNERTUBE_CLIENT_VERSION":\s*"([^"]+)"/
        );

        if (nameMatch && nameMatch[1]) clientName = nameMatch[1];
        if (versionMatch && versionMatch[1]) clientVersion = versionMatch[1];
      }

      return { clientName, clientVersion };
    },

    async fetchVideoDetails(videoId) {
      try {
        const apiKey = this.getApiKey();
        if (!apiKey) return null;

        const { clientName, clientVersion } = this.getClientInfo();
        if (!clientName || !clientVersion) return null;

        const response = await fetch(
          `https://www.youtube.com/youtubei/v1/player?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videoId: videoId,
              context: {
                client: {
                  clientName: clientName,
                  clientVersion: clientVersion,
                },
              },
            }),
          }
        );

        if (!response.ok) return null;
        const data = await response.json();
        if (data && data.videoDetails && data.videoDetails.title) {
          return data.videoDetails.title;
        }
        return "YouTube Video";
      } catch (error) {
        return "YouTube Video";
      }
    },

    async getVideoTitle(callback) {
      const videoId = this.getVideoId();
      const title = await this.fetchVideoDetails(videoId);
      callback(title || "YouTube Video");
    },

    formatTime(time) {
      const date = new Date();
      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const timeString = [
        Math.floor(time / 3600),
        Math.floor((time % 3600) / 60),
        Math.floor(time % 60),
      ]
        .map((v) => v.toString().padStart(2, "0"))
        .join("-");
      return `${dateString} ${timeString}`;
    },

    async copyToClipboard(blob) {
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
    },

    downloadScreenshot(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    captureScreenshot(player, action = "download") {
      if (!player) return;

      const canvas = document.createElement("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(player, 0, 0, canvas.width, canvas.height);

      this.getVideoTitle((title) => {
        const time = player.currentTime;
        const filename = `${title} ${this.formatTime(time)}.${
          buttonConfig.extension
        }`;

        canvas.toBlob(async (blob) => {
          if (action === "copy") {
            await this.copyToClipboard(blob);
          } else {
            this.downloadScreenshot(blob, filename);
          }
        }, `image/${buttonConfig.screenshotFormat}`);
      });
    },
  };

  const regularVideo = {
    init() {
      this.waitForControls().then(() => {
        this.insertLoopElement();
        this.insertSaveScreenshotElement();
        this.insertCopyScreenshotElement();
        this.addObserver();
        this.addContextMenuListener();
      });
    },

    waitForControls() {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 50;

        const checkControls = () => {
          const controls = document.querySelector("div.ytp-left-controls");
          if (controls) {
            resolve(controls);
          } else if (attempts >= maxAttempts) {
            reject(new Error("Controls not found after maximum attempts"));
          } else {
            attempts++;
            setTimeout(checkControls, 100);
          }
        };

        checkControls();
      });
    },

    insertLoopElement() {
      const controls = document.querySelector("div.ytp-left-controls");
      if (!controls) return;

      if (document.querySelector(".buttonLoopAndScreenshot-loop-button"))
        return;

      const newButton = document.createElement("a");
      newButton.classList.add(
        "ytp-button",
        "buttonLoopAndScreenshot-loop-button"
      );
      newButton.title = "Loop Video";
      newButton.appendChild(iconUtils.createLoopIcon());
      newButton.addEventListener("click", this.toggleLoopState);

      controls.appendChild(newButton);
    },

    insertSaveScreenshotElement() {
      const controls = document.querySelector("div.ytp-left-controls");
      if (!controls) return;

      if (
        document.querySelector(
          ".buttonLoopAndScreenshot-save-screenshot-button"
        )
      )
        return;

      const newButton = document.createElement("a");
      newButton.classList.add(
        "ytp-button",
        "buttonLoopAndScreenshot-save-screenshot-button"
      );
      newButton.title = "Save Screenshot";
      newButton.appendChild(iconUtils.createSaveScreenshotIcon());
      newButton.addEventListener("click", this.handleSaveScreenshotClick);

      const loopButton = document.querySelector(
        ".buttonLoopAndScreenshot-loop-button"
      );
      if (loopButton) {
        loopButton.parentNode.insertBefore(newButton, loopButton.nextSibling);
      } else {
        controls.appendChild(newButton);
      }
    },

    insertCopyScreenshotElement() {
      const controls = document.querySelector("div.ytp-left-controls");
      if (!controls) return;

      if (
        document.querySelector(
          ".buttonLoopAndScreenshot-copy-screenshot-button"
        )
      )
        return;

      const newButton = document.createElement("a");
      newButton.classList.add(
        "ytp-button",
        "buttonLoopAndScreenshot-copy-screenshot-button"
      );
      newButton.title = "Copy Screenshot to Clipboard";
      newButton.appendChild(iconUtils.createCopyScreenshotIcon());
      newButton.addEventListener("click", this.handleCopyScreenshotClick);

      const saveButton = document.querySelector(
        ".buttonLoopAndScreenshot-save-screenshot-button"
      );
      if (saveButton) {
        saveButton.parentNode.insertBefore(newButton, saveButton.nextSibling);
      } else {
        controls.appendChild(newButton);
      }
    },

    toggleLoopState() {
      const video = document.querySelector("video");
      video.loop = !video.loop;
      if (video.loop) video.play();

      regularVideo.updateToggleControls();
    },

    updateToggleControls() {
      const youtubeVideoLoop = document.querySelector(
        ".buttonLoopAndScreenshot-loop-button"
      );
      youtubeVideoLoop.classList.toggle("active");
      youtubeVideoLoop.setAttribute(
        "title",
        this.isActive() ? "Stop Looping" : "Loop Video"
      );
    },

    isActive() {
      const youtubeVideoLoop = document.querySelector(
        ".buttonLoopAndScreenshot-loop-button"
      );
      return youtubeVideoLoop.classList.contains("active");
    },

    addObserver() {
      const video = document.querySelector("video");
      new MutationObserver((mutations) => {
        mutations.forEach(() => {
          if (
            (video.getAttribute("loop") === null && this.isActive()) ||
            (video.getAttribute("loop") !== null && !this.isActive())
          )
            this.updateToggleControls();
        });
      }).observe(video, { attributes: true, attributeFilter: ["loop"] });
    },

    addContextMenuListener() {
      const video = document.querySelector("video");
      video.addEventListener("contextmenu", () => {
        setTimeout(() => {
          const checkbox = document.querySelector("[role=menuitemcheckbox]");
          checkbox.setAttribute("aria-checked", this.isActive());
          checkbox.addEventListener("click", this.toggleLoopState);
        }, 50);
      });
    },

    handleSaveScreenshotClick(event) {
      const button = event.currentTarget;
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, buttonConfig.clickDuration);

      const player = document.querySelector("video");
      buttonUtils.captureScreenshot(player, "download");
    },

    handleCopyScreenshotClick(event) {
      const button = event.currentTarget;
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, buttonConfig.clickDuration);

      const player = document.querySelector("video");
      buttonUtils.captureScreenshot(player, "copy");
    },
  };

  const shortsVideo = {
    init() {
      this.insertSaveScreenshotElement();
      this.insertCopyScreenshotElement();
    },

    insertSaveScreenshotElement() {
      const likeButtonContainer = document.querySelector(
        "ytd-reel-video-renderer[is-active] #like-button"
      );
      if (
        likeButtonContainer &&
        !document.querySelector(".buttonLoopAndScreenshot-shorts-save-button")
      ) {
        const iconDiv = document.createElement("div");
        iconDiv.className = "buttonLoopAndScreenshot-shorts-save-button";
        iconDiv.title = "Save Screenshot";
        iconDiv.appendChild(iconUtils.createSaveScreenshotIcon(true));

        likeButtonContainer.parentNode.insertBefore(
          iconDiv,
          likeButtonContainer
        );

        iconDiv.addEventListener("click", (event) => {
          const button = event.currentTarget;
          button.classList.add("clicked");

          setTimeout(() => {
            button.classList.remove("clicked");
          }, buttonConfig.clickDuration);

          this.captureScreenshot("download");
        });
      }
    },

    insertCopyScreenshotElement() {
      const likeButtonContainer = document.querySelector(
        "ytd-reel-video-renderer[is-active] #like-button"
      );
      const saveButton = document.querySelector(
        ".buttonLoopAndScreenshot-shorts-save-button"
      );

      if (
        likeButtonContainer &&
        !document.querySelector(".buttonLoopAndScreenshot-shorts-copy-button")
      ) {
        const iconDiv = document.createElement("div");
        iconDiv.className = "buttonLoopAndScreenshot-shorts-copy-button";
        iconDiv.title = "Copy Screenshot to Clipboard";
        iconDiv.appendChild(iconUtils.createCopyScreenshotIcon(true));

        if (saveButton) {
          saveButton.parentNode.insertBefore(iconDiv, saveButton.nextSibling);
        } else {
          likeButtonContainer.parentNode.insertBefore(
            iconDiv,
            likeButtonContainer
          );
        }

        iconDiv.addEventListener("click", (event) => {
          const button = event.currentTarget;
          button.classList.add("clicked");

          setTimeout(() => {
            button.classList.remove("clicked");
          }, buttonConfig.clickDuration);

          this.captureScreenshot("copy");
        });
      }
    },

    captureScreenshot(action) {
      const player = document.querySelector(
        "ytd-reel-video-renderer[is-active] video"
      );
      buttonUtils.captureScreenshot(player, action);
    },
  };

  const themeHandler = {
    init() {
      this.updateStyles();
      this.addObserver();
    },

    updateStyles() {
      const isDarkTheme = document.documentElement.hasAttribute("dark");
      document.documentElement.classList.toggle("dark-theme", isDarkTheme);
    },

    addObserver() {
      const observer = new MutationObserver(() => this.updateStyles());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["dark"],
      });
    },
  };

  function initialize() {
    buttonUtils.addStyle(buttonCSS);
    waitForVideo().then(initializeWhenReady);
  }

  function waitForVideo() {
    return new Promise((resolve) => {
      const checkVideo = () => {
        if (document.querySelector("video")) {
          resolve();
        } else {
          setTimeout(checkVideo, 100);
        }
      };
      checkVideo();
    });
  }

  function initializeWhenReady() {
    initializeFeatures();
  }

  function initializeFeatures() {
    regularVideo.init();
    themeHandler.init();
    initializeShortsFeatures();
  }

  function initializeShortsFeatures() {
    if (window.location.pathname.includes("/shorts/")) {
      setTimeout(shortsVideo.init.bind(shortsVideo), 500);
    }
  }

  const keyboardShortcuts = {
    init() {
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
    },

    handleKeyDown(event) {
      if (!event.altKey) return;

      if (event.key === "s" || event.key === "c" || event.key === "l") {
        event.preventDefault();
        event.stopPropagation();
      }

      switch (event.key.toLowerCase()) {
        case "s":
          this.triggerSaveScreenshot();
          break;
        case "c":
          this.triggerCopyScreenshot();
          break;
        case "l":
          this.triggerLoopToggle();
          break;
      }
    },

    triggerSaveScreenshot() {
      if (window.location.pathname.includes("/shorts/")) {
        const player = document.querySelector(
          "ytd-reel-video-renderer[is-active] video"
        );
        if (player) {
          buttonUtils.captureScreenshot(player, "download");
          this.showShortcutFeedback("save");
        }
      } else {
        const player = document.querySelector("video");
        if (player) {
          buttonUtils.captureScreenshot(player, "download");
          this.showShortcutFeedback("save");
        }
      }
    },

    triggerCopyScreenshot() {
      if (window.location.pathname.includes("/shorts/")) {
        const player = document.querySelector(
          "ytd-reel-video-renderer[is-active] video"
        );
        if (player) {
          buttonUtils.captureScreenshot(player, "copy");
          this.showShortcutFeedback("copy");
        }
      } else {
        const player = document.querySelector("video");
        if (player) {
          buttonUtils.captureScreenshot(player, "copy");
          this.showShortcutFeedback("copy");
        }
      }
    },

    triggerLoopToggle() {
      if (!window.location.pathname.includes("/shorts/")) {
        const video = document.querySelector("video");
        if (video) {
          video.loop = !video.loop;
          if (video.loop) video.play();
          regularVideo.updateToggleControls();
          this.showShortcutFeedback("loop");
        }
      }
    },

    showShortcutFeedback(action) {
      let button;
      if (window.location.pathname.includes("/shorts/")) {
        if (action === "save") {
          button = document.querySelector(
            ".buttonLoopAndScreenshot-shorts-save-button"
          );
        } else if (action === "copy") {
          button = document.querySelector(
            ".buttonLoopAndScreenshot-shorts-copy-button"
          );
        }
      } else {
        if (action === "save") {
          button = document.querySelector(
            ".buttonLoopAndScreenshot-save-screenshot-button"
          );
        } else if (action === "copy") {
          button = document.querySelector(
            ".buttonLoopAndScreenshot-copy-screenshot-button"
          );
        } else if (action === "loop") {
          button = document.querySelector(
            ".buttonLoopAndScreenshot-loop-button"
          );
        }
      }

      if (button) {
        button.classList.add("clicked");
        setTimeout(() => {
          button.classList.remove("clicked");
        }, buttonConfig.clickDuration);
      }
    },
  };

  const shortsObserver = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.type === "childList") {
        initializeShortsFeatures();
      }
    }
  });

  shortsObserver.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("yt-navigate-finish", initializeShortsFeatures);

  document.addEventListener("yt-action", function (event) {
    if (
      event.detail &&
      event.detail.actionName === "yt-reload-continuation-items-command"
    ) {
      initializeShortsFeatures();
    }
  });

  keyboardShortcuts.init();

  initialize();
})();
