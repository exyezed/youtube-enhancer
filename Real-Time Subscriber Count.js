// ==UserScript==
// @name         YouTube Enhancer (Real-Time Subscriber Count)
// @description  Display Real-Time Subscriber Count.
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgd2lkdGg9IjEwMHB4IiBoZWlnaHQ9IjEwMHB4IiBiYXNlUHJvZmlsZT0iYmFzaWMiPjxwYXRoIGZpbGw9IiNkZTMzM2IiIGQ9Ik04OS40MzcsMzkuMjNjLTAuODQxLTAuNzk0LTIuMTEzLTAuOTk2LTMuMjUzLTEuMzAzYy02LjMyNi0xLjcwNC0xMC42NTQtOC44MS05LjI2Ni0xNS4yMTMJYzAuMjYzLTEuMjEyLDAuNjk5LTIuNDgxLDAuMzA1LTMuNjU3Yy0wLjI2OS0wLjgwMi0wLjg5LTEuNDMxLTEuNTE4LTEuOTk4Yy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3CWMtMS4wMDQtMC40MDktMi4wNzEtMC43NjMtMy4xNTItMC42NzFjLTIuMTgsMC4xODUtMy43NjEsMi4wNTQtNS41MywzLjM0MmMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1CWMtMi43ODUtMS4xMzgtNS4wODktMy4zNDUtNy45OTItNC4xMzVjLTUuOTctMS42MjQtMTIuMDI5LDMuNTYzLTEyLjUyOCw5LjM3MWMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjUJYy0wLjkxOCwzLjk5Ni00LjE4LDcuMzYyLTguMTQ1LDguNDA1Yy0xLjMwOSwwLjM0NC0yLjc2NSwwLjQ5Ni0zLjc0OCwxLjQyN2MtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczCWMtMC4zNjQsMy4xMDktMC40MTMsNi4yNTYtMC4xNDUsOS4zNzVjMC4wNjYsMC43NzIsMC4xNjIsMS41NzMsMC41NzUsMi4yMjhjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjIJYzYuMjQ4LDEuNTcyLDEwLjQzNyw4Ljc5Myw4LjcwMSwxNC45OTdjLTAuNDUsMS42MDctMS4yNCwzLjI0NC0wLjg1Miw0Ljg2N2MwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NAljMi4xMzMsMS40OTQsNC40NDUsMi43MzQsNi44NjksMy42ODVjNC44MTMsMS44ODksNy4zNDEtMy43MzQsMTEuMzA3LTUuMTk4YzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOQljNC4wMTMsMi4zMDcsNS42Nyw3LjA2LDEwLjk1OSw0Ljg2MmMzLjA2MS0xLjI3Miw4Ljg4Ny01LjE3NSw4LjQzLTkuMTI0Yy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMgljMS44NDctMy4zMyw1LTYuMDA2LDguNzYyLTYuODRjMC45ODQtMC4yMTgsMi4wNDQtMC4zNSwyLjgyMy0wLjk4OWMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxNwljMC4xNC0zLjE4LTAuMTU5LTYuMzgtMC44ODUtOS40NzljLTAuMTctMC43MjYtMC4zNzctMS40NzQtMC44NTgtMi4wNDNDODkuNTgsMzkuMzcyLDg5LjUxLDM5LjI5OSw4OS40MzcsMzkuMjN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTcyLjg0NiwyMy43NDFjMC4yNjMtMS4yMTIsMC42OTktMi40ODEsMC4zMDUtMy42NTdjLTAuMjY5LTAuODAyLTAuODktMS40MzEtMS41MTgtMS45OTggYy0yLjMwMi0yLjA4LTQuOTY5LTMuNzU2LTcuODQyLTQuOTI3Yy0xLjAwNC0wLjQwOS0yLjA3MS0wLjc2My0zLjE1Mi0wLjY3MWMtMi4xOCwwLjE4NS0zLjc2MSwyLjA1NC01LjUzLDMuMzQyIGMtMy4xNjUsMi4zMDUtNy41MzksMi44MzYtMTEuMTY0LDEuMzU1Yy0yLjc4NS0xLjEzOC01LjA4OS0zLjM0NS03Ljk5Mi00LjEzNWMtNS45Ny0xLjYyNC0xMi4wMjksMy41NjMtMTIuNTI4LDkuMzcxIGMtMC4yMjgsMi42NTUsMC4xMDgsNS4zNjgtMC40ODksNy45NjVjLTAuOTE4LDMuOTk2LTQuMTgsNy4zNjItOC4xNDUsOC40MDVjLTEuMzA5LDAuMzQ0LTIuNzY2LDAuNDk2LTMuNzQ4LDEuNDI3IGMtMC45NDQsMC44OTQtMS4yLDIuMjgxLTEuMzUyLDMuNTczYy0wLjM2NCwzLjEwOS0wLjQxMyw2LjI1Ni0wLjE0NSw5LjM3NWMwLjA2NiwwLjc3MiwwLjE2MiwxLjU3MywwLjU3NSwyLjIyOCBjMC44ODYsMS40MDcsMi43OTYsMS42MTYsNC40MDgsMi4wMjJjNi4yNDgsMS41NzIsMTAuNDM3LDguNzkzLDguNzAxLDE0Ljk5N2MtMC40NSwxLjYwNy0xLjI0LDMuMjQ0LTAuODUyLDQuODY3IGMwLjM1NiwxLjQ4OSwxLjYyMywyLjU2NiwyLjg3NywzLjQ0NGMyLjEzMywxLjQ5NCw0LjQ0NSwyLjczNCw2Ljg2OSwzLjY4NWM0LjgxMywxLjg4OSw3LjM0MS0zLjczNCwxMS4zMDctNS4xOTggYzMuNDU1LTEuMjc1LDcuNTE3LTEuMDM2LDEwLjcyNiwwLjgwOWM0LjAxMywyLjMwNyw1LjY3LDcuMDYsMTAuOTU5LDQuODYyYzMuMDYxLTEuMjcyLDguODg3LTUuMTc1LDguNDMtOS4xMjQgYy0wLjUzMi00LjU5LTEuNTU3LTcuODUxLDAuODYyLTEyLjIxMmMxLjg0Ny0zLjMzLDUtNi4wMDYsOC43NjItNi44NGMwLjk4NC0wLjIxOCwyLjA0NC0wLjM1LDIuODIzLTAuOTg5IGMxLjA0OC0wLjg2MSwxLjI2My0yLjM2MiwxLjMyMi0zLjcxN2MwLjE0LTMuMTgtMC4xNTktNi4zOC0wLjg4NS05LjQ3OWMtMC4xNy0wLjcyNi0wLjM3Ny0xLjQ3NC0wLjg1OC0yLjA0MyBjLTAuMDY2LTAuMDc4LTAuMTM2LTAuMTUyLTAuMjA5LTAuMjIxYy0wLjg0MS0wLjc5NC0yLjExMy0wLjk5Ni0zLjI1My0xLjMwMyIvPjxwYXRoIGQ9Ik03Mi44NDYsMjMuNzQxYzAsMCwwLjA1NC0wLjIwNSwwLjE2LTAuNjA0YzAuMDk4LTAuNDAxLDAuMjk3LTAuOTg4LDAuMzctMS44MDVjMC4wMzItMC40MDYsMC4wMTUtMC44OC0wLjE1MS0xLjM3MiBjLTAuMTY0LTAuNDkzLTAuNDg3LTAuOTcxLTAuODktMS40MTdjLTAuODI1LTAuODcyLTEuODUtMS43NzQtMy4wOTEtMi43MDNjLTEuMjQyLTAuOTItMi43MDUtMS44NDgtNC40MTItMi42NjMgYy0wLjg1NS0wLjM5Ni0xLjc0Ny0wLjgzMS0yLjgxNy0xLjA2N2MtMS4wNTktMC4yNTktMi4zMzMtMC4xMDYtMy4zODMsMC40M2MtMS4wNjYsMC41MTktMS45NjYsMS4yNzgtMi44NjgsMS45OSBjLTAuODk4LDAuNzI3LTEuODE3LDEuMzQzLTIuODkyLDEuOGMtMi4xMjgsMC44OTctNC42OTYsMS4xODYtNy4xNTEsMC41MjhjLTIuNDcxLTAuNTgxLTQuNTY2LTIuNDc5LTcuMzg0LTMuOTY3IGMtMS40MDctMC43MzctMy4xMjQtMS4yNDgtNC44NzQtMS4yMThjLTEuNzUsMC4wMTYtMy41MDMsMC41MTYtNS4wNjIsMS4zNzhjLTMuMTA0LDEuNzE4LTUuNjE3LDQuODYxLTYuMjA5LDguNzYgYy0wLjI3MiwxLjg5Mi0wLjE3NiwzLjY0Mi0wLjI2NSw1LjMzOWMtMC4wNzQsMS43LTAuMywzLjI1MS0wLjk5MSw0LjY3Yy0wLjY3MywxLjQyNC0xLjcsMi43MTktMi45NzUsMy43MTcgYy0wLjY0LDAuNDk1LTEuMzM4LDAuOTE3LTIuMDc2LDEuMjQ0Yy0wLjc2NCwwLjMzNS0xLjQ0OSwwLjUzNC0yLjQwMiwwLjczYy0wLjkyNiwwLjIxOS0yLjEzNSwwLjQ0NC0zLjI4LDEuMzU2IGMtMS4xNjEsMC45NDMtMS42NTEsMi4zMDMtMS44OCwzLjM4NWMtMC4yMzEsMS4xMjktMC4zMDEsMi4wNzMtMC40MDMsMy4wOWMtMC4wODgsMS4wMDYtMC4xNDEsMi4wMi0wLjE2NiwzLjAzOSBjLTAuMDIzLDEuMDE5LTAuMDEyLDIuMDQ0LDAuMDI5LDMuMDcybDAuMDkxLDEuNTQ0YzAuMDM5LDAuNTAxLDAuMDczLDEuMDY2LDAuMjE4LDEuNzI2YzAuMTM2LDAuNjQxLDAuNDQ4LDEuNDQsMC45ODMsMi4wNTMgYzAuNTIyLDAuNjIsMS4xODMsMS4wNTUsMS43ODksMS4zMjdjMS4yMjYsMC41NDksMi4zMTcsMC43MDEsMy4yMTMsMC45MzZjMS42NTUsMC40MzgsMy4yMDcsMS4zNCw0LjQ3OCwyLjU5OSBjMS4yNDMsMS4yNzYsMi4yNzIsMi44NDIsMi44MTUsNC41NzdjMC41NjQsMS43MjIsMC43MiwzLjU1NCwwLjMzMSw1LjI0M2MtMC4xMzcsMC44MjMtMC41NDIsMS43NTctMC44MzQsMi45MDIgYy0wLjE0OCwwLjU3LTAuMjY2LDEuMjEyLTAuMjc4LDEuOTExYy0wLjAxOCwwLjY5NSwwLjExNywxLjQ2NSwwLjM5MSwyLjE0N2MwLjU2OSwxLjM3NCwxLjUzMiwyLjI5NiwyLjQxOSwzLjAwOCBjMC45MTIsMC43MTUsMS43NjEsMS4yNTQsMi42NjcsMS44MTVjMS44MTUsMS4wOTMsMy42NDYsMi4wMDcsNS42NTEsMi43NDdjMS4xNDYsMC40NTEsMi41OCwwLjU0NywzLjgyOSwwLjIyMSBjMS4yNi0wLjMyLDIuMjc4LTAuOTU4LDMuMTM3LTEuNTkzYzEuNzA3LTEuMjksMi45ODgtMi42NzksNC4zNTYtMy40OTJjMC4zNDItMC4yMTcsMC42NTYtMC4zNTEsMS4wMTEtMC41MDEgYzAuMzg5LTAuMTQyLDAuNzg0LTAuMjY1LDEuMTg1LTAuMzY2YzAuODAzLTAuMjAxLDEuNjI2LTAuMzE0LDIuNDQ4LTAuMzQyYzEuNjQ0LTAuMDU2LDMuMjgzLDAuMjMzLDQuNzQ5LDAuODQ4IGMxLjQ4MiwwLjU5NywyLjY2NCwxLjU5MiwzLjk3MSwyLjc5YzAuNjU0LDAuNTkyLDEuMzMzLDEuMjE5LDIuMTM4LDEuNzk1YzAuNzk3LDAuNTY4LDEuNzY1LDEuMTAxLDIuODYxLDEuMjkgYzEuMDkxLDAuMiwyLjE2NywwLjA2LDMuMTI3LTAuMmMwLjk0My0wLjMxMSwxLjc3Ni0wLjY4OSwyLjU0NC0xLjExOGMxLjU0NC0wLjg1NSwyLjk1My0xLjg1LDQuMjI2LTMuMDEzIGMwLjYyOS0wLjU5MSwxLjIzNC0xLjIwOCwxLjc1NC0xLjkyMmMwLjUzMS0wLjY5NSwwLjk5LTEuNDgzLDEuMjgxLTIuMzc0YzAuMTY1LTAuNDM1LDAuMjMtMC45MTgsMC4yOTEtMS4zOTMgYzAuMDA1LTAuNDc2LTAuMDE0LTEuMDIxLTAuMDc5LTEuMzZjLTAuMTE1LTAuNzU4LTAuMjI5LTEuNTEtMC4zNDEtMi4yNTRjLTAuMjMtMS40NjctMC40MTgtMi44NjMtMC4zODQtNC4xOTMgYzAuMDM1LTEuMzI4LDAuMzA4LTIuNTkyLDAuODA3LTMuNzdjMC45ODEtMi4zNzcsMi42Mi00LjM2OCw0LjQ4OS01Ljc2M2MwLjk0NC0wLjY4OSwxLjk0Ny0xLjI0OCwyLjk4My0xLjYyNSBjMC41MjMtMC4xODksMS4wMjktMC4zMzgsMS41NzItMC40NmMwLjU0NS0wLjEyNiwxLjEyMS0wLjI1LDEuNjg3LTAuNDljMC41NjQtMC4yMywxLjExNS0wLjYyOCwxLjQ3MS0xLjEzMiBjMC4zNjktMC40OTcsMC41Ny0xLjA1MiwwLjY5Ny0xLjU4M2MwLjI0NC0xLjA3MywwLjIxNC0yLjA2OSwwLjIxNy0zLjAwNmMtMC4wMTctMS44ODUtMC4xODktMy42LTAuNDMtNS4xMjQgYy0wLjI0NS0xLjUyNi0wLjU1LTIuODU1LTAuODg5LTQuMDAyYy0wLjE4MS0wLjU3Mi0wLjQzMy0xLjA5NS0wLjc4OS0xLjQ3NmMtMC4zNTItMC4zODUtMC43NjUtMC42MTgtMS4xMzktMC43ODEgYy0wLjc1OS0wLjMxMS0xLjM3MS0wLjQxLTEuNzcyLTAuNTA2Yy0wLjQwMy0wLjA5LTAuNjEtMC4xMzYtMC42MS0wLjEzNnMwLjIwNCwwLjA1OSwwLjYwMSwwLjE3MyBjMC4zOTQsMC4xMTksMS4wMDIsMC4yNTcsMS43MTksMC42MDJjMC4zNTMsMC4xNzksMC43MjksMC40MjQsMS4wMzIsMC43OTVjMC4zMDYsMC4zNjcsMC41MTIsMC44NiwwLjY1NiwxLjQxOCBjMC4yNjgsMS4xMzEsMC41MDIsMi40NzUsMC42NjMsMy45ODRjMC4xNTgsMS41MTEsMC4yNDIsMy4yMDEsMC4xNjcsNS4wNDNjLTAuMDQ1LDAuOTIxLTAuMDc0LDEuODg5LTAuMzI4LDIuNzg0IGMtMC4yNSwwLjkwNi0wLjc2OSwxLjY0Ny0xLjY2OCwxLjk0N2MtMC44NzksMC4zMi0yLjA4OCwwLjM4OC0zLjI1NiwwLjc4NmMtMS4xNjYsMC4zNjgtMi4zMDUsMC45MzctMy4zODMsMS42NTcgYy0yLjEzOSwxLjQ2NC00LjAzLDMuNTY3LTUuMjUxLDYuMjEzYy0wLjYyNCwxLjMyMS0xLjAxMywyLjgyNy0xLjEwNyw0LjM2NWMtMC4wOTYsMS41MzgsMC4wNjMsMy4wNjUsMC4yNDIsNC41NTUgYzAuMDg2LDAuNzM4LDAuMTcyLDEuNDgzLDAuMjYsMi4yMzRjMC4wNTksMC40MTUsMC4wMjYsMC42NCwwLjAzMiwwLjkzMWMtMC4wNTksMC4yODUtMC4wOTIsMC41NzItMC4yMiwwLjg2MiBjLTAuNDE4LDEuMTY5LTEuNDE0LDIuMjkyLTIuNTI4LDMuMjY2Yy0xLjEzNiwwLjk3NS0yLjQ0NSwxLjg0NS0zLjgzNCwyLjU2MWMtMC42OTYsMC4zNjYtMS40MDgsMC42NDgtMi4wNzUsMC44NTMgYy0wLjY3NCwwLjE1NC0xLjMyMiwwLjIxMS0xLjkyNCwwLjA4NGMtMi40NTMtMC40NjYtNC40NTEtNC4zLTguMzMxLTUuOTQ0Yy0xLjg1Ni0wLjgyOC0zLjkwMy0xLjIyOS01Ljk2NS0xLjIgYy0xLjAzMSwwLjAxNS0yLjA2NywwLjEzNy0zLjA4OCwwLjM3MmMtMC41MSwwLjExOC0xLjAxNiwwLjI2NS0xLjUxNiwwLjQzOGMtMC41MTksMC4xOTgtMS4wNzYsMC40MzgtMS41NDEsMC43MjIgYy0xLjkwOCwxLjEyNi0zLjI2NSwyLjU5MS00LjY3MSwzLjU5MWMtMC42OTUsMC41MDMtMS4zOCwwLjg4LTIuMDIxLDEuMDI4Yy0wLjY0MSwwLjE0Mi0xLjI1OCwwLjEyMS0xLjk0OC0wLjE1NiBjLTEuNjgyLTAuNjQyLTMuNDIxLTEuNTIyLTUuMDI1LTIuNTE0Yy0xLjYwMi0xLjAwNS0zLjMxNS0yLjE2NS0zLjY5NS0zLjI0MmMtMC4yLTAuNDk4LTAuMTg2LTEuMTA0LDAuMDM4LTEuOTU4IGMwLjIwNi0wLjg0MywwLjYzNy0xLjgxLDAuODc1LTMuMDIxYzAuNTM4LTIuMzQ1LDAuMzIyLTQuNzk2LTAuNDEzLTcuMDM2Yy0wLjcxNy0yLjI1Ny0yLjAyNS00LjI2NS0zLjY2Mi01LjkyNyBjLTEuNjYxLTEuNjM5LTMuNzY4LTIuODczLTYuMDU1LTMuNDU0Yy0xLjA3NC0wLjI1Ni0yLjAwOC0wLjQyMy0yLjYzLTAuNzFjLTAuMzE2LTAuMTM3LTAuNTA1LTAuMjg5LTAuNjM2LTAuNDM1IGMtMC4xMzItMC4xNDctMC4yMDktMC4zMDctMC4yOTMtMC42NGMtMC4wNzYtMC4zMTgtMC4xMTktMC43NTUtMC4xNTktMS4yNDdsLTAuMDk5LTEuNDM3Yy0wLjA0OS0wLjk1Ny0wLjA3LTEuOTEyLTAuMDU5LTIuODYyIGMwLjAxMi0wLjk1LDAuMDUtMS44OTYsMC4xMTktMi44MzZjMC4wNzYtMC45MjUsMC4xNTQtMS45MjUsMC4zMDQtMi42OTNjMC4xNTctMC43OTEsMC40MTctMS4zMzYsMC43NjUtMS42MTkgYzAuMzUzLTAuMzE5LDEuMDY3LTAuNTU1LDEuOTctMC43NjFjMC45LTAuMTk1LDIuMDM2LTAuNTI3LDIuOTc1LTAuOTc3YzAuOTY3LTAuNDUxLDEuODY1LTEuMDE5LDIuNjc3LTEuNjc1IGMxLjYyLTEuMzIyLDIuODk4LTMsMy43MjktNC44NjhjMC44NjMtMS44NzUsMS4wOTUtMy45NTMsMS4xMjEtNS43NjVjMC4wNDMtMS44MjUtMC4wNzctMy41NzEsMC4xMTEtNS4wODQgYzAuMzQxLTIuOTQ4LDIuMzAyLTUuNjM3LDQuNzY4LTcuMDgyYzEuMjMyLTAuNzMzLDIuNi0xLjE2NiwzLjk1OC0xLjIyNWMxLjM2NS0wLjA2MywyLjY3NCwwLjI2LDMuOTM0LDAuODU4IGMyLjUwNSwxLjE3NSw0LjksMy4xOTYsNy44NzEsMy44MDdjMi44ODQsMC42NDgsNS43NjYsMC4xOSw4LjEyNC0wLjkyMmMxLjE3OS0wLjU1NSwyLjIzNC0xLjM0LDMuMTA1LTIuMTE1IGMwLjg4My0wLjc2NiwxLjY5NS0xLjUwMiwyLjU3NC0xLjk3N2MwLjg3NS0wLjQ4NCwxLjc5Ni0wLjY0NCwyLjcxOS0wLjQ3NmMwLjkyMSwwLjE1MywxLjgxOCwwLjUyNiwyLjY2NiwwLjg3MiBjMS42OTUsMC43MDksMy4xNjcsMS41NCw0LjQzLDIuMzc4YzEuMjU3LDAuODQxLDIuMzMsMS42ODgsMy4xNywyLjQ4NGMwLjQwOSwwLjQwNSwwLjczMiwwLjgzMiwwLjkwOCwxLjI3OCBjMC4xNzksMC40NDQsMC4yMjMsMC44OTEsMC4yMTUsMS4yODdjLTAuMDI0LDAuNzk2LTAuMTg2LDEuMzk5LTAuMjYxLDEuODAzQzcyLjg4OCwyMy41MzIsNzIuODQ2LDIzLjc0MSw3Mi44NDYsMjMuNzQxeiIvPjxwYXRoIGZpbGw9IiNmMmYyZjIiIGQ9Ik02Ni44NDcsNDkuMDk5YzAuMDEtMS4xOTItMC42MzktMi4yNDMtMS42OTUtMy4wMzZjLTUuMTkzLTMuOTAxLTEwLjUxLTcuNjMyLTE1LjkzOS0xMS4xOTgJYy0wLjU3Ny0wLjM3OS0xLjE2Ny0wLjUzMS0xLjczNC0wLjUyOGMtMC4xNTktMC4xNDMtMC4zMTQtMC4yOTItMC40NzYtMC40MzNjLTEuMjI2LTEuMDY0LTIuNzczLTEuMzA4LTQuMjI1LTAuNTQ1CWMtMi4yNzksMS4xOTktMi42NTUsMy41MzQtMi40OTUsNS44NjFjMC4wNCwwLjU3NywwLjA4LDEuMTU1LDAuMTE5LDEuNzMyYzAsMC4wMDEsMCwwLjAwMiwwLDAuMDA0CWMtMC4wODYsMi40NiwwLjE0OCw0Ljk3NCwwLjIyMiw3LjQzNWMwLjA3NCwyLjQ3OCwwLjE0OCw0Ljk1NywwLjIyMiw3LjQzNWMwLjAzOSwxLjMyMiwwLjA3OSwyLjY0NCwwLjExOCwzLjk2NQljMC4wNDIsMS40MjQtMC4wODEsMi45NzEsMC42NTUsNC4yNDhjMS42OTUsMi45NDMsNS4xMzksMi4yNjgsNy41ODEsMC44MzVjMS45NzYtMS4xNiwzLjkzNC0yLjM1MSw1Ljg1NS0zLjYwMQljMy44OTEtMi41MzQsNy42NTYtNS4zMjMsMTEuMDA4LTguNTQ0QzY3LjAzNiw1MS43OTMsNjcuMjg3LDUwLjMyNyw2Ni44NDcsNDkuMDk5eiIvPjwvc3ZnPg==
// @version      1.5
// @author       exyezed
// @namespace    https://github.com/exyezed/youtube-enhancer/
// @supportURL   https://github.com/exyezed/youtube-enhancer/issues
// @license      MIT
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  "use strict";

  const FONT_LINK =
    "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap";
  const STATS_API_URL =
    "https://api.livecounts.io/youtube-live-subscriber-counter/stats/";
  const UPDATE_INTERVAL = 2000;

  let overlay = null;
  let isUpdating = false;
  let intervalId = null;
  let currentChannelName = null;

  const lastSuccessfulStats = new Map();
  const previousStats = new Map();

  let previousUrl = location.href;
  let isChecking = false;

  async function fetchChannel(url) {
    if (isChecking) return null;
    isChecking = true;

    try {
      const response = await fetch(url, {
        credentials: "same-origin",
      });

      if (!response.ok) return null;

      const html = await response.text();
      const match = html.match(/var ytInitialData = (.+?);<\/script>/);
      return match && match[1] ? JSON.parse(match[1]) : null;
    } catch (error) {
      return null;
    } finally {
      isChecking = false;
    }
  }

  async function getChannelInfo(url) {
    const data = await fetchChannel(url);
    if (!data) return null;

    try {
      const channelName =
        data?.metadata?.channelMetadataRenderer?.title || "Unknown";
      const channelId =
        data?.metadata?.channelMetadataRenderer?.externalId || null;

      return { channelName, channelId };
    } catch (e) {
      return null;
    }
  }

  function isChannelPageUrl(url) {
    return (
      url.includes("youtube.com/") &&
      (url.includes("/channel/") || url.includes("/@")) &&
      !url.includes("/video/") &&
      !url.includes("/watch")
    );
  }

  function checkUrlChange() {
    const currentUrl = location.href;
    if (currentUrl !== previousUrl) {
      previousUrl = currentUrl;
      if (isChannelPageUrl(currentUrl)) {
        setTimeout(() => getChannelInfo(currentUrl), 500);
      }
    }
  }

  history.pushState = (function (f) {
    return function () {
      f.apply(this, arguments);
      checkUrlChange();
    };
  })(history.pushState);

  history.replaceState = (function (f) {
    return function () {
      f.apply(this, arguments);
      checkUrlChange();
    };
  })(history.replaceState);

  window.addEventListener("popstate", checkUrlChange);
  setInterval(checkUrlChange, 1000);

  function init() {
    loadFonts();
    addStyles();
    observePageChanges();
    addNavigationListener();

    if (isChannelPageUrl(location.href)) {
      getChannelInfo(location.href);
    }
  }

  function loadFonts() {
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = FONT_LINK;
    document.head.appendChild(fontLink);
  }

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  function createSpinner() {
    const spinnerWrapper = document.createElement("div");
    Object.assign(spinnerWrapper.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "10",
    });
    spinnerWrapper.classList.add("spinner-container");

    const spinner = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    spinner.setAttribute("viewBox", "0 0 512 512");
    spinner.setAttribute("width", "64");
    spinner.setAttribute("height", "64");
    spinner.classList.add("loading-spinner");
    spinner.style.animation = "spin 1s linear infinite";

    const currentColor = getThemeColor();

    const secondaryPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    secondaryPath.setAttribute(
      "d",
      "M0 256C0 114.9 114.1 .5 255.1 0C237.9 .5 224 14.6 224 32c0 17.7 14.3 32 32 32C150 64 64 150 64 256s86 192 192 192c69.7 0 130.7-37.1 164.5-92.6c-3 6.6-3.3 14.8-1 22.2c1.2 3.7 3 7.2 5.4 10.3c1.2 1.5 2.6 3 4.1 4.3c.8 .7 1.6 1.3 2.4 1.9c.4 .3 .8 .6 1.3 .9s.9 .6 1.3 .8c5 2.9 10.6 4.3 16 4.3c11 0 21.8-5.7 27.7-16c-44.3 76.5-127 128-221.7 128C114.6 512 0 397.4 0 256z"
    );
    secondaryPath.style.opacity = "0.4";
    secondaryPath.style.fill = currentColor;

    const primaryPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    primaryPath.setAttribute(
      "d",
      "M224 32c0-17.7 14.3-32 32-32C397.4 0 512 114.6 512 256c0 46.6-12.5 90.4-34.3 128c-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96c0-106-86-192-192-192c-17.7 0-32-14.3-32-32z"
    );
    primaryPath.style.fill = currentColor;

    spinner.appendChild(secondaryPath);
    spinner.appendChild(primaryPath);
    spinnerWrapper.appendChild(spinner);
    return spinnerWrapper;
  }

  function createSVGIcon(path) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 640 512");
    svg.setAttribute("width", "2rem");
    svg.setAttribute("height", "2rem");
    svg.style.marginRight = "0.5rem";
    svg.style.display = "none";

    const svgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    svgPath.setAttribute("d", path);
    svgPath.setAttribute("fill", getThemeColor());

    svg.appendChild(svgPath);
    return svg;
  }

  function createStatContainer(className, iconPath) {
    const container = document.createElement("div");
    Object.assign(container.style, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      visibility: "hidden",
      width: "33%",
      height: "100%",
      padding: "0 1rem",
    });

    const numberContainer = document.createElement("div");
    Object.assign(numberContainer.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      height: "4rem",
    });

    const digitContainer = createNumberContainer();
    digitContainer.classList.add(`${className}-number`);
    Object.assign(digitContainer.style, {
      fontSize: "4rem",
      fontWeight: "bold",
      lineHeight: "1",
      height: "4rem",
      fontFamily: "inherit",
      letterSpacing: "0.025em",
    });

    const differenceElement = document.createElement("div");
    differenceElement.classList.add(`${className}-difference`);
    Object.assign(differenceElement.style, {
      fontSize: "2.2rem",
      position: "absolute",
      right: "-60px",
      top: "50%",
      transform: "translateY(-50%)",
      whiteSpace: "nowrap",
      opacity: "0.8",
    });

    numberContainer.appendChild(digitContainer);
    numberContainer.appendChild(differenceElement);

    const labelContainer = document.createElement("div");
    Object.assign(labelContainer.style, {
      display: "flex",
      alignItems: "center",
      marginTop: "0.5rem",
    });

    const icon = createSVGIcon(iconPath);
    Object.assign(icon.style, {
      width: "2rem",
      height: "2rem",
      marginRight: "0.75rem",
    });

    const labelElement = document.createElement("div");
    labelElement.classList.add(`${className}-label`);
    labelElement.style.fontSize = "2rem";

    labelContainer.appendChild(icon);
    labelContainer.appendChild(labelElement);

    container.appendChild(numberContainer);
    container.appendChild(labelContainer);

    return container;
  }

  function getThemeColor() {
    const isDarkTheme =
      document.documentElement.getAttribute("dark") !== null ||
      document.documentElement.getAttribute("data-dark") !== null ||
      document.body.getAttribute("dark") !== null ||
      document.querySelector("html[dark]") !== null ||
      document.querySelector('[dark="true"]') !== null;
    return isDarkTheme ? "white" : "black";
  }

  function updateThemeColors() {
    if (!overlay) return;
    const currentColor = getThemeColor();
    overlay.style.color = currentColor;
    overlay
      .querySelectorAll(".loading-spinner path")
      .forEach((path) => (path.style.fill = currentColor));
    overlay.querySelectorAll("svg path").forEach((path) => {
      if (!path.closest(".loading-spinner"))
        path.setAttribute("fill", currentColor);
    });
  }

  function createOverlay(containerElement) {
    clearExistingOverlay();

    if (!containerElement) return null;

    const overlay = document.createElement("div");
    overlay.classList.add("channel-banner-overlay");
    Object.assign(overlay.style, {
      position: "relative",
      width: "100%",
      maxWidth: "1280px",
      height: "120px",
      backgroundColor: "transparent",
      borderRadius: "15px",
      zIndex: "1",
      color: getThemeColor(),
      fontFamily: "Rubik, sans-serif",
      marginTop: "16px",
      marginLeft: "auto",
      marginRight: "auto",
    });

    const contentContainer = document.createElement("div");
    Object.assign(contentContainer.style, {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "100%",
    });
    contentContainer.classList.add("stats-content");

    const subscribersElement = createStatContainer(
      "subscribers",
      "M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
    );
    const viewsElement = createStatContainer(
      "views",
      "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
    );
    const videosElement = createStatContainer(
      "videos",
      "M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
    );

    contentContainer.append(subscribersElement, viewsElement, videosElement);
    overlay.append(contentContainer, createSpinner());

    containerElement.insertAdjacentElement("afterend", overlay);
    updateDisplayState();
    return overlay;
  }

  function fetchWithGM(url, headers = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: headers,
        onload: function (response) {
          if (response.status === 200) {
            resolve(JSON.parse(response.responseText));
          } else {
            reject(new Error(`Failed to fetch: ${response.status}`));
          }
        },
        onerror: function (error) {
          reject(error);
        },
      });
    });
  }

  async function fetchChannelId(_channelName) {
    try {
      const channelInfo = await getChannelInfo(window.location.href);
      if (channelInfo && channelInfo.channelId) {
        return channelInfo.channelId;
      }

      const metaTag = document.querySelector('meta[itemprop="channelId"]');
      if (metaTag && metaTag.content) {
        return metaTag.content;
      }

      const urlMatch = window.location.href.match(/channel\/(UC[\w-]+)/);
      if (urlMatch && urlMatch[1]) {
        return urlMatch[1];
      }

      throw new Error("Could not determine channel ID");
    } catch (error) {
      const metaTag = document.querySelector('meta[itemprop="channelId"]');
      if (metaTag && metaTag.content) {
        return metaTag.content;
      }

      const urlMatch = window.location.href.match(/channel\/(UC[\w-]+)/);
      if (urlMatch && urlMatch[1]) {
        return urlMatch[1];
      }

      throw new Error("Could not determine channel ID");
    }
  }

  async function fetchChannelStats(channelId) {
    let retries = 3;
    while (retries > 0) {
      try {
        const stats = await fetchWithGM(`${STATS_API_URL}${channelId}`, {
          origin: "https://livecounts.io",
          referer: "https://livecounts.io/",
        });
        if (stats && typeof stats.followerCount !== "undefined") {
          lastSuccessfulStats.set(channelId, stats);
          return stats;
        }
      } catch (e) {
        retries--;
        if (retries > 0)
          await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (lastSuccessfulStats.has(channelId))
      return lastSuccessfulStats.get(channelId);

    const fallbackStats = { followerCount: 0, bottomOdos: [0, 0], error: true };
    const subCountElem = document.querySelector("#subscriber-count");
    if (subCountElem) {
      const subMatch = subCountElem.textContent.match(/[\d,]+/);
      if (subMatch)
        fallbackStats.followerCount = parseInt(subMatch[0].replace(/,/g, ""));
    }
    return fallbackStats;
  }

  function clearExistingOverlay() {
    const existingOverlay = document.querySelector(".channel-banner-overlay");
    if (existingOverlay) {
      existingOverlay.remove();
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    lastSuccessfulStats.clear();
    previousStats.clear();
    isUpdating = false;
    overlay = null;
  }

  function createDigitElement() {
    const digit = document.createElement("span");
    Object.assign(digit.style, {
      display: "inline-block",
      width: "0.6em",
      textAlign: "center",
      marginRight: "0.025em",
      marginLeft: "0.025em",
    });
    return digit;
  }

  function createCommaElement() {
    const comma = document.createElement("span");
    comma.textContent = ",";
    Object.assign(comma.style, {
      display: "inline-block",
      width: "0.3em",
      textAlign: "center",
    });
    return comma;
  }

  function createNumberContainer() {
    const container = document.createElement("div");
    Object.assign(container.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      letterSpacing: "0.025em",
    });
    return container;
  }

  function updateDigits(container, newValue) {
    const newValueStr = newValue.toString();
    const digits = [];

    for (let i = newValueStr.length - 1; i >= 0; i -= 3) {
      const start = Math.max(0, i - 2);
      digits.unshift(newValueStr.slice(start, i + 1));
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let digitIndex = 0;

    for (let i = 0; i < digits.length; i++) {
      const group = digits[i];
      for (let j = 0; j < group.length; j++) {
        const digitElement = createDigitElement();
        digitElement.textContent = group[j];
        container.appendChild(digitElement);
        digitIndex++;
      }
      if (i < digits.length - 1) {
        container.appendChild(createCommaElement());
      }
    }

    let elementIndex = 0;
    for (let i = 0; i < digits.length; i++) {
      const group = digits[i];
      for (let j = 0; j < group.length; j++) {
        const digitElement = container.children[elementIndex];
        const newDigit = parseInt(group[j]);
        const currentDigit = parseInt(digitElement.textContent || "0");

        if (currentDigit !== newDigit) {
          animateDigit(digitElement, currentDigit, newDigit);
        }
        elementIndex++;
      }
      if (i < digits.length - 1) {
        elementIndex++;
      }
    }
  }

  function animateDigit(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + (end - start) * easeOutQuart);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function showContent(overlay) {
    const spinnerContainer = overlay.querySelector(".spinner-container");
    if (spinnerContainer) {
      spinnerContainer.remove();
    }

    const containers = overlay.querySelectorAll(
      'div[style*="visibility: hidden"]'
    );
    containers.forEach((container) => {
      container.style.visibility = "visible";
    });

    const icons = overlay.querySelectorAll('svg[style*="display: none"]');
    icons.forEach((icon) => {
      icon.style.display = "block";
    });
  }

  function updateDifferenceElement(element, currentValue, previousValue) {
    if (!previousValue) return;

    const difference = currentValue - previousValue;
    if (difference === 0) {
      element.textContent = "";
      return;
    }

    const sign = difference > 0 ? "+" : "";
    element.textContent = `${sign}${difference.toLocaleString()}`;
    element.style.color = difference > 0 ? "#1ed760" : "#f3727f";

    setTimeout(() => {
      element.textContent = "";
    }, 1000);
  }

  function updateDisplayState() {
    const overlay = document.querySelector(".channel-banner-overlay");
    const contentContainer = overlay?.querySelector(".stats-content");
    const statContainers = contentContainer?.querySelectorAll(
      'div[style*="width"]'
    );
    if (!statContainers?.length) return;

    statContainers.forEach((container) =>
      Object.assign(container.style, { display: "flex", width: "33.33%" })
    );
    contentContainer.style.display = "flex";
  }

  async function updateOverlayContent(overlay, channelName) {
    if (isUpdating || channelName !== currentChannelName) return;
    isUpdating = true;

    try {
      const channelId = await fetchChannelId(channelName);
      const stats = await fetchChannelStats(channelId);

      if (channelName !== currentChannelName) {
        isUpdating = false;
        return;
      }

      if (stats.error) {
        const containers = overlay.querySelectorAll('[class$="-number"]');
        containers.forEach((container) => {
          if (
            container.classList.contains("subscribers-number") &&
            stats.followerCount > 0
          ) {
            updateDigits(container, stats.followerCount);
          } else {
            container.textContent = "---";
          }
        });
        return;
      }

      const updateElement = (className, value, label) => {
        const numberContainer = overlay.querySelector(`.${className}-number`);
        const differenceElement = overlay.querySelector(
          `.${className}-difference`
        );
        const labelElement = overlay.querySelector(`.${className}-label`);

        if (numberContainer) {
          updateDigits(numberContainer, value);
        }

        if (differenceElement && previousStats.has(channelId)) {
          const previousValue =
            className === "subscribers"
              ? previousStats.get(channelId).followerCount
              : previousStats.get(channelId).bottomOdos[
                  className === "views" ? 0 : 1
                ];
          updateDifferenceElement(differenceElement, value, previousValue);
        }

        if (labelElement) {
          labelElement.textContent = label;
        }
      };

      updateElement("subscribers", stats.followerCount, "Subscribers");
      updateElement("views", stats.bottomOdos[0], "Views");
      updateElement("videos", stats.bottomOdos[1], "Videos");

      if (!previousStats.has(channelId)) {
        showContent(overlay);
      }

      previousStats.set(channelId, stats);
    } catch (error) {
      const containers = overlay.querySelectorAll('[class$="-number"]');
      containers.forEach((container) => {
        container.textContent = "---";
      });
    } finally {
      isUpdating = false;
    }
  }

  function addOverlay(containerElement) {
    const channelName = window.location.pathname.split("/")[1].replace("@", "");

    if (channelName === currentChannelName && overlay) {
      return;
    }

    currentChannelName = channelName;
    overlay = createOverlay(containerElement);

    if (overlay) {
      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(
        () => updateOverlayContent(overlay, channelName),
        UPDATE_INTERVAL
      );

      updateOverlayContent(overlay, channelName);
    }
  }

  function isChannelPage() {
    return (
      window.location.pathname.startsWith("/@") ||
      window.location.pathname.startsWith("/channel/") ||
      window.location.pathname.startsWith("/c/")
    );
  }

  function observePageChanges() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const containerElement = document.getElementById(
            "page-header-container"
          );
          if (containerElement && isChannelPage()) {
            addOverlay(containerElement);
            break;
          }
        }
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "dark" ||
            mutation.attributeName === "data-dark") &&
          overlay
        ) {
          updateThemeColors();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "dark" ||
            mutation.attributeName === "data-dark") &&
          overlay
        ) {
          updateThemeColors();
        }
      });
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dark", "data-dark"],
    });
  }

  function addNavigationListener() {
    window.addEventListener("yt-navigate-finish", () => {
      if (!isChannelPage()) {
        clearExistingOverlay();
        currentChannelName = null;
      } else {
        const containerElement = document.getElementById(
          "page-header-container"
        );
        if (containerElement) {
          addOverlay(containerElement);
        }
      }
    });
  }

  init();
})();