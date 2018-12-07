#!/bin/bash

V_CURRENT=$(git describe --exact-match $(git rev-list --tags --date-order --max-count=1) --tags)
echo -e "Current Version: $V_CURRENT"
V_MAJOR=$(echo $V_CURRENT | cut -d. -f1)
V_MINOR=$(echo $V_CURRENT | cut -d. -f2)
V_PATCH=$(echo $V_CURRENT | cut -d. -f3)

if [ -z "$2" ]
then
	echo -e "No"
else
	echo -e "Yes"
fi

if [ "$1" = "-j" -o "$1" = "-maj" -o "$1" = "-major" ]
then
    if [ -z "$2" ]
	then
		V_MAJOR=$((V_MAJOR + 1))
	else
		V_MAJOR="$2"
	fi
elif [ "$1" = "-n" -o "$1" = "-min" -o "$1" = "-minor" ]
then
    if [ -z "$2" ]
	then
		V_MINOR=$((V_MINOR + 1))
	else
		V_MINOR="$2"
	fi
else
	if [ -z "$2" ]
	then
		V_PATCH=$((V_PATCH + 1))
	else
		V_PATCH="$2"
	fi
fi

echo -e "Patched Version: $V_MAJOR.$V_MINOR.$V_PATCH"

#git tag "$V_MAJOR.$V_MINOR.$V_PATCH" -a "$V_MAJOR.$V_MINOR.$V_PATCH"