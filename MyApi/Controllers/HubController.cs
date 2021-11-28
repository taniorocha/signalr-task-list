using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MyApi.Controllers
{
    public class HubController: Hub
    {
        public static List<Item> _itemList;

        public HubController()
        {
            if(_itemList == null)
                _itemList = new List<Item>();
        }

        public async Task JoinConnection()
        {
            await Clients.Client(Context.ConnectionId).SendAsync("UpdateList", _itemList);
        }

        public async Task NewItem(Item item)
        {
            _itemList.Add(item);
            await Clients.All.SendAsync("UpdateList", _itemList); 
        }

        public async Task ChangeCheckItem(string name)
        {
            _itemList.ForEach(x=> {
                if(x.Name == name)
                    x.Done = !x.Done;
            });
            await Clients.All.SendAsync("UpdateList", _itemList); 
        }

        public async Task ClearList()
        {
            _itemList = new List<Item>();
            await Clients.All.SendAsync("UpdateList", _itemList); 
        }
    }

    public class Item 
    {
        public string Name { get; set; }
        public bool Done { get; set; }    
    }
}