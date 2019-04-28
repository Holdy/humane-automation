
in ~/.erm/data


Each directory represents a data structure.


A scripts may reference 
	[local hue hub list].

so there will be a directory
	~/.humane/data/local hue hub list

As this is a collection, there will be at least one directory below this, representing one local hub.

   ~/.humane/data/local hue hub list/my named hub


The files in this directory then represent the data=fields of that object.

   ./my named hub/label.txt         my named hub
   ./my named hub/mac address.txt   ox:ox:ox:ox
   ./my named hub/ip address.txt    1.2.3.4

When [local hue hub list] is referenced, the engine will first look if the data is available.
If it is, the data is used from that location.

If not, the engine will look for metadata.

humane-automation-root/scripts/meta/local hue hub list.disco.txt

this may contain:
   
   get http://discovery.myhue.com

   for each entry in the list
	map id to id
	map internalipaddress to internal ip address
	set type to 'philips hue hub'



   
   