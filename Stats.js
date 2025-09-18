// ==UserScript==
// @name         YouTube Enhancer (Stats)
// @description  Add a Stats Button.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      2.2
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const styles = `
        .videoStats {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-left: 8px;
        }
        html[dark] .videoStats {
            background-color: #ffffff1a;
        }
        html:not([dark]) .videoStats {
            background-color: #0000000d;
        }
        html[dark] .videoStats:hover {
            background-color: #ffffff33;
        }
        html:not([dark]) .videoStats:hover {
            background-color: #00000014;
        }
        .videoStats svg {
            width: 18px;
            height: 18px;
        }
        html[dark] .videoStats svg {
            fill: var(--yt-spec-text-primary, #fff);
        }
        html:not([dark]) .videoStats svg {
            fill: var(--yt-spec-text-primary, #030303);
        }

        .shortsStats {
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

        html[dark] .shortsStats {
            background-color: rgba(255, 255, 255, 0.1);
        }

        html:not([dark]) .shortsStats {
            background-color: rgba(0, 0, 0, 0.05);
        }

        html[dark] .shortsStats:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        html:not([dark]) .shortsStats:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .shortsStats svg {
            width: 24px;
            height: 24px;
        }

        html[dark] .shortsStats svg {
            fill: white;
        }

        html:not([dark]) .shortsStats svg {
            fill: black;
        }
        
        .stats-menu-container {
            position: relative;
            display: inline-block;
        }

        .stats-horizontal-menu {
            position: absolute;
            display: flex;
            left: 100%;
            top: 0;
            height: 100%;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.2s linear;
            z-index: 100;
        }

        .stats-menu-container:hover .stats-horizontal-menu {
            visibility: visible;
            opacity: 1;
        }

        .stats-menu-button {
            margin-left: 8px;
            white-space: nowrap;
        }

        .ytFlexibleActionsViewModelAction .stats-menu-container {
            display: inline-flex;
            align-items: center;
        }
    `;

    let previousUrl = location.href;
    let isChecking = false;
    let channelFeatures = {
        hasStreams: false,
        hasShorts: false
    };

    function addStyles() {
        if (!document.querySelector('#youtube-enhancer-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'youtube-enhancer-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }
    }

    function getCurrentVideoUrl() {
        const url = window.location.href;
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('v');
        
        if (videoId) {
            return `https://www.youtube.com/watch?v=${videoId}`;
        }
        
        const shortsMatch = url.match(/\/shorts\/([^?]+)/);
        if (shortsMatch) {
            return `https://www.youtube.com/shorts/${shortsMatch[1]}`;
        }
        
        return null;
    }

    function getChannelIdentifier() {
        const url = window.location.href;
        let identifier = '';

        if (url.includes('/channel/')) {
            identifier = url.split('/channel/')[1].split('/')[0];
        } else if (url.includes('/@')) {
            identifier = url.split('/@')[1].split('/')[0];
        }

        return identifier;
    }

    async function checkChannelTabs(url) {
        if (isChecking) return;
        isChecking = true;
        
        try {
            const response = await fetch(url, {
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                isChecking = false;
                return;
            }
            
            const html = await response.text();
            const match = html.match(/var ytInitialData = (.+?);<\/script>/);
            
            if (!match || !match[1]) {
                isChecking = false;
                return;
            }
            
            const data = JSON.parse(match[1]);
            const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
            
            let hasStreams = false;
            let hasShorts = false;
            
            tabs.forEach(tab => {
                const tabUrl = tab?.tabRenderer?.endpoint?.commandMetadata?.webCommandMetadata?.url;
                if (tabUrl) {
                    if (/\/streams$/.test(tabUrl)) hasStreams = true;
                    if (/\/shorts$/.test(tabUrl)) hasShorts = true;
                }
            });
            
            channelFeatures = {
                hasStreams: hasStreams,
                hasShorts: hasShorts
            };
            
            const existingMenu = document.querySelector('.stats-menu-container');
            if (existingMenu) {
                existingMenu.remove();
                createStatsMenu();
            }
        } catch (e) {
        } finally {
            isChecking = false;
        }
    }

    function isChannelPage(url) {
        return url.includes('youtube.com/') && 
               (url.includes('/channel/') || url.includes('/@')) && 
               !url.includes('/video/') && 
               !url.includes('/watch');
    }

    function checkUrlChange() {
        const currentUrl = location.href;
        if (currentUrl !== previousUrl) {
            previousUrl = currentUrl;
            if (isChannelPage(currentUrl)) {
                setTimeout(() => checkChannelTabs(currentUrl), 500);
            }
        }
    }

    function createStatsIcon(isShorts = false) {
        const icon = document.createElement('div');
        icon.className = isShorts ? 'shortsStats' : 'videoStats';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M500 89c13.8-11 16-31.2 5-45s-31.2-16-45-5L319.4 151.5 211.2 70.4c-11.7-8.8-27.8-8.5-39.2 .6L12 199c-13.8 11-16 31.2-5 45s31.2 16 45 5L192.6 136.5l108.2 81.1c11.7 8.8 27.8 8.5 39.2-.6L500 89zM160 256l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32zM32 352l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32zm288-64c-17.7 0-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32zm96-32l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32z");
        
        svg.appendChild(path);
        icon.appendChild(svg);

        icon.addEventListener('click', redirectToStatsAPI);

        return icon;
    }

    function redirectToStatsAPI() {
        const videoUrl = getCurrentVideoUrl();
        if (videoUrl) {
            const apiUrl = `https://stats.afkarxyz.fun/?directVideo=${encodeURIComponent(videoUrl)}`;
            window.open(apiUrl, '_blank');
        }
    }

    function insertIconForRegularVideo() {
        const targetSelector = '#owner';
        const target = document.querySelector(targetSelector);

        if (target && !document.querySelector('.videoStats')) {
            const statsIcon = createStatsIcon();
            target.appendChild(statsIcon);
        }
    }    
    
    function insertIconForShorts() {
        const likeButtonContainer = document.querySelector('ytd-reel-video-renderer[is-active] #like-button');
        
        if (likeButtonContainer && !document.querySelector('.shortsStats')) {
            const iconDiv = createStatsIcon(true);
            likeButtonContainer.parentNode.insertBefore(iconDiv, likeButtonContainer);
            return true;
        }
        return false;
    }

    function createButton(text, svgPath, viewBox, className, onClick) {
        const buttonViewModel = document.createElement('button-view-model');
        buttonViewModel.className = `yt-spec-button-view-model ${className}-view-model`;

        const button = document.createElement('button');
        button.className = `yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment ${className}-button`;
        button.setAttribute('aria-disabled', 'false');
        button.setAttribute('aria-label', text);
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.gap = '8px';

        button.addEventListener('click', onClick);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", viewBox);
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.fill = "currentColor";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", svgPath);
        svg.appendChild(path);

        const buttonText = document.createElement('div');
        buttonText.className = `yt-spec-button-shape-next__button-text-content ${className}-text`;
        buttonText.textContent = text;
        buttonText.style.display = 'flex';
        buttonText.style.alignItems = 'center';

        const touchFeedback = document.createElement('yt-touch-feedback-shape');
        touchFeedback.style.borderRadius = 'inherit';

        const touchFeedbackDiv = document.createElement('div');
        touchFeedbackDiv.className = 'yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response';
        touchFeedbackDiv.setAttribute('aria-hidden', 'true');

        const strokeDiv = document.createElement('div');
        strokeDiv.className = 'yt-spec-touch-feedback-shape__stroke';

        const fillDiv = document.createElement('div');
        fillDiv.className = 'yt-spec-touch-feedback-shape__fill';

        touchFeedbackDiv.appendChild(strokeDiv);
        touchFeedbackDiv.appendChild(fillDiv);
        touchFeedback.appendChild(touchFeedbackDiv);

        button.appendChild(svg);
        button.appendChild(buttonText);
        button.appendChild(touchFeedback);
        buttonViewModel.appendChild(button);

        return buttonViewModel;
    }

    function createStatsMenu() {
        if (document.querySelector('.stats-menu-container')) {
            return;
        }

        const containerDiv = document.createElement('div');
        containerDiv.className = 'ytFlexibleActionsViewModelAction stats-menu-container';

        const mainButtonViewModel = document.createElement('button-view-model');
        mainButtonViewModel.className = 'yt-spec-button-view-model main-stats-view-model';

        const mainButton = document.createElement('button');
        mainButton.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment main-stats-button';
        mainButton.setAttribute('aria-disabled', 'false');
        mainButton.setAttribute('aria-label', 'Stats');
        mainButton.style.display = 'flex';
        mainButton.style.alignItems = 'center';
        mainButton.style.justifyContent = 'center';
        mainButton.style.gap = '8px';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.style.width = "20px";
        svg.style.height = "20px";
        svg.style.fill = "currentColor";

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M500 89c13.8-11 16-31.2 5-45s-31.2-16-45-5L319.4 151.5 211.2 70.4c-11.7-8.8-27.8-8.5-39.2 .6L12 199c-13.8 11-16 31.2-5 45s31.2 16 45 5L192.6 136.5l108.2 81.1c11.7 8.8 27.8 8.5 39.2-.6L500 89zM160 256l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32zM32 352l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32zm288-64c-17.7 0-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32zm96-32l0 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-192c0-17.7-14.3-32-32-32s-32 14.3-32 32z");
        svg.appendChild(path);

        const buttonText = document.createElement('div');
        buttonText.className = 'yt-spec-button-shape-next__button-text-content main-stats-text';
        buttonText.textContent = 'Stats';
        buttonText.style.display = 'flex';
        buttonText.style.alignItems = 'center';

        const touchFeedback = document.createElement('yt-touch-feedback-shape');
        touchFeedback.style.borderRadius = 'inherit';

        const touchFeedbackDiv = document.createElement('div');
        touchFeedbackDiv.className = 'yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response';
        touchFeedbackDiv.setAttribute('aria-hidden', 'true');

        const strokeDiv = document.createElement('div');
        strokeDiv.className = 'yt-spec-touch-feedback-shape__stroke';

        const fillDiv = document.createElement('div');
        fillDiv.className = 'yt-spec-touch-feedback-shape__fill';

        touchFeedbackDiv.appendChild(strokeDiv);
        touchFeedbackDiv.appendChild(fillDiv);
        touchFeedback.appendChild(touchFeedbackDiv);

        mainButton.appendChild(svg);
        mainButton.appendChild(buttonText);
        mainButton.appendChild(touchFeedback);
        mainButtonViewModel.appendChild(mainButton);
        containerDiv.appendChild(mainButtonViewModel);

        const horizontalMenu = document.createElement('div');
        horizontalMenu.className = 'stats-horizontal-menu';

        const channelButtonContainer = document.createElement('div');
        channelButtonContainer.className = 'stats-menu-button channel-stats-container';
        
        const channelButton = createButton(
            'Channel', 
            "M64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l512 0c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48zM0 64C0 28.7 28.7 0 64 0L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 416c-35.3 0-64-28.7-64-64L0 64zM120 464l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-400 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z",
            "0 0 640 512",
            'channel-stats',
            () => {
                const channelId = getChannelIdentifier();
                if (channelId) {
                    const url = `https://stats.afkarxyz.fun/?directChannel=${channelId}`;
                    window.open(url, '_blank');
                }
            }
        );
        
        channelButtonContainer.appendChild(channelButton);
        horizontalMenu.appendChild(channelButtonContainer);

        if (channelFeatures.hasStreams) {
            const liveButtonContainer = document.createElement('div');
            liveButtonContainer.className = 'stats-menu-button live-stats-container';
            
            const liveButton = createButton(
                'Live', 
                "M99.8 69.4c10.2 8.4 11.6 23.6 3.2 33.8C68.6 144.7 48 197.9 48 256s20.6 111.3 55 152.8c8.4 10.2 7 25.3-3.2 33.8s-25.3 7-33.8-3.2C24.8 389.6 0 325.7 0 256S24.8 122.4 66 72.6c8.4-10.2 23.6-11.6 33.8-3.2zm376.5 0c10.2-8.4 25.3-7 33.8 3.2c41.2 49.8 66 113.8 66 183.4s-24.8 133.6-66 183.4c-8.4 10.2-23.6 11.6-33.8 3.2s-11.6-23.6-3.2-33.8c34.3-41.5 55-94.7 55-152.8s-20.6-111.3-55-152.8c-8.4-10.2-7-25.3 3.2-33.8zM248 256a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-61.1-78.5C170 199.2 160 226.4 160 256s10 56.8 26.9 78.5c8.1 10.5 6.3 25.5-4.2 33.7s-25.5 6.3-33.7-4.2c-23.2-29.8-37-67.3-37-108s13.8-78.2 37-108c8.1-10.5 23.2-12.3 33.7-4.2s12.3 23.2 4.2 33.7zM427 148c23.2 29.8 37 67.3 37 108s-13.8 78.2-37 108c-8.1 10.5-23.2 12.3-33.7 4.2s-12.3-23.2-4.2-33.7C406 312.8 416 285.6 416 256s-10-56.8-26.9-78.5c-8.1-10.5-6.3-25.5 4.2-33.7s25.5-6.3 33.7 4.2z",
                "0 0 576 512",
                'live-stats',
                () => {
                    const channelId = getChannelIdentifier();
                    if (channelId) {
                        const url = `https://stats.afkarxyz.fun/?directStream=${channelId}`;
                        window.open(url, '_blank');
                    }
                }
            );
            
            liveButtonContainer.appendChild(liveButton);
            horizontalMenu.appendChild(liveButtonContainer);
        }

        if (channelFeatures.hasShorts) {
            const shortsButtonContainer = document.createElement('div');
            shortsButtonContainer.className = 'stats-menu-button shorts-stats-container';
            
            const shortsButton = createButton(
                'Shorts', 
                "M80 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l224 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16L80 48zM16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM160 400l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z",
                "0 0 384 512",
                'shorts-stats',
                () => {
                    const channelId = getChannelIdentifier();
                    if (channelId) {
                        const url = `https://stats.afkarxyz.fun/?directShorts=${channelId}`;
                        window.open(url, '_blank');
                    }
                }
            );
            
            shortsButtonContainer.appendChild(shortsButton);
            horizontalMenu.appendChild(shortsButtonContainer);
        }

        containerDiv.appendChild(horizontalMenu);

        const flexibleActionsContainer = document.querySelector('yt-flexible-actions-view-model.ytFlexibleActionsViewModelHost');
        if (flexibleActionsContainer) {
            flexibleActionsContainer.appendChild(containerDiv);
        } else {
            const joinButton = document.querySelector('.yt-flexible-actions-view-model-wiz__action:not(.stats-menu-container)');
            if (joinButton) {
                joinButton.parentNode.appendChild(containerDiv);
            } else {
                const buttonContainer = document.querySelector('#subscribe-button + #buttons');
                if (buttonContainer) {
                    buttonContainer.appendChild(containerDiv);
                }
            }
        }

        return containerDiv;
    }

    function checkAndAddMenu() {
        const flexibleActionsContainer = document.querySelector('yt-flexible-actions-view-model.ytFlexibleActionsViewModelHost');
        const statsMenu = document.querySelector('.stats-menu-container');

        if (flexibleActionsContainer && !statsMenu) {
            createStatsMenu();
            return;
        }

        const joinButton = document.querySelector('.yt-flexible-actions-view-model-wiz__action:not(.stats-menu-container)');
        if (joinButton && !statsMenu) {
            createStatsMenu();
        }
    }

    function checkAndInsertIcon() {
        const isShorts = window.location.pathname.includes('/shorts/');
        if (isShorts) {
            const shortsObserver = new MutationObserver((_mutations, observer) => {
                if (insertIconForShorts()) {
                    observer.disconnect();
                }
            });

            const shortsContainer = document.querySelector('ytd-shorts');
            if (shortsContainer) {
                shortsObserver.observe(shortsContainer, { 
                    childList: true, 
                    subtree: true 
                });
                insertIconForShorts();
            }
        } else if (getCurrentVideoUrl()) {
            insertIconForRegularVideo();
        }
    }

    function init() {
        addStyles();
        checkAndInsertIcon();
        checkAndAddMenu();
        
        history.pushState = (function(f) {
            return function() {
                const result = f.apply(this, arguments);
                checkUrlChange();
                return result;
            };
        })(history.pushState);

        history.replaceState = (function(f) {
            return function() {
                const result = f.apply(this, arguments);
                checkUrlChange();
                return result;
            };
        })(history.replaceState);

        window.addEventListener('popstate', checkUrlChange);
        
        if (isChannelPage(location.href)) {
            checkChannelTabs(location.href);
        }
    }

    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                checkAndInsertIcon();
                checkAndAddMenu();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('yt-navigate-finish', () => {
        checkAndInsertIcon();
        checkAndAddMenu();
        if (isChannelPage(location.href)) {
            checkChannelTabs(location.href);
        }
    });

    document.addEventListener('yt-action', function(event) {
        if (event.detail && event.detail.actionName === 'yt-reload-continuation-items-command') {
            checkAndInsertIcon();
            checkAndAddMenu();
        }
    });
})();