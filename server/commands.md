# To create the nuget packages

1-Increase the package version in `SolutionInfo.xml`

2-In command line run `nuget pack`

3-In command line run `nuget add .\Brainvest.Dscribe.Runtime.0.2.1.nupkg -source \\localhost\nuget`, but remember to adjust for the current file