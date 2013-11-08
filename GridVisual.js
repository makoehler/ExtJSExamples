Ext.onReady(function() {
   Ext.QuickTips.init();
  
  function showMenu(grid, index, event) {
      event.stopEvent();
      var record = grid.getStore().getAt(index);
      var contextMenu = new Ext.menu.Menu({
          items: [{
              text: 'View Details',
            icon : 'https://cdn1.iconfinder.com/data/icons/windows-8-metro-style/16/money_bag.png'
          }, {
              text: 'Hide Record',
            icon : 'https://cdn1.iconfinder.com/data/icons/gnomeicontheme/16x16/stock/net/stock_mail-hide-deleted.png'
          }, {
              text: 'Move Up',
            icon : 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519838-50_Cloud_Arrow_Up-16.png'
          }, {
              text: 'Move Down',
            icon : 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519839-51_Coud_Arrow_Down-16.png'
          }
                 ]
      }).showAt(event.xy);
  }
  
   Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
     pageSize: 5,
       fields:['name', 'city', 'country', 'email', 'phone',  {
             name : 'salary',
             type : 'float'
           }, {
             name : 'bonus',
             type : 'float'
           },
            {
             name: 'cityGroup',
             mapping : 'city',
             convert: function(v, record) {
                     return 'Summary for ' + v ;
             }
        }],
      groupField: 'city',
    data:{'items':[
          { 'name': 'Lisa',  "city" : "Calgary",  "country" : "Canada","email":"lisa@simpsons.com",  "phone":"555-111-1224", "salary" : 12222.00, "bonus" : 2000  },
        { 'name': 'Bart',  "city" : "Calgary",  "country" : "Canada" ,  "email":"bart@simpsons.com",  "phone":"555-222-1234" , "salary" : 12322.00, "bonus" : 2000},
        { 'name': 'Homer',  "city" : "Calgary",  "country" : "Canada" , "email":"home@simpsons.com",  "phone":"555-222-1244", "salary" : 13222.00, "bonus" : 2000  },
        { 'name': 'Marge',  "city" : "Calgary",  "country" : "Canada" , "email":"marget@simpsons.com", "phone":"555-222-1254", "salary" : 14222.00, "bonus" : 2000  },
        { 'name': 'Lisa',  "city" : "Hyderabad",  "country" : "India"  ,"email":"lisa@simpsons.com",  "phone":"555-111-1224", "salary" : 12522.00, "bonus" : 2000  },
        { 'name': 'Bart',  "city" : "Hyderabad" ,  "country" : "India" ,  "email":"bart@simpsons.com",  "phone":"555-222-1234", "salary" : 16222.00, "bonus" : 2000 },
        { 'name': 'Homer',  "city" : "Hyderabad" ,  "country" : "India" , "email":"home@simpsons.com",  "phone":"555-222-1244", "salary" : 12222.00, "bonus" : 2000  },
        { 'name': 'Marge',  "city" : "Hyderabad",  "country" : "India"  , "email":"marge@simpsons.com", "phone":"555-222-1254" , "salary" : 17222.00, "bonus" : 2000 },
        { 'name': 'Peter',  "city" : "Chicago",  "country" : "USA"  , "email":"peter@simpsons.com", "phone":"555-222-1254", "salary" : 18222.00, "bonus" : 2000  },
    { 'name': 'Pratyush',  "city" : "Hyderabad",  "country" : "India"  , "email":"pratyush@simpsons.com", "phone":"555-222-1254" , "salary" : 17222.00, "bonus" : 2000 },
        { 'name': 'Pratyush',  "city" : "Chicago",  "country" : "USA"  , "email":"pratyush@simpsons.com", "phone":"555-222-1254", "salary" : 18222.00, "bonus" : 2000  },
    { 'name': 'Aayush',  "city" : "Hyderabad",  "country" : "India"  , "email":"aayush@simpsons.com", "phone":"555-222-1254" , "salary" : 17222.00, "bonus" : 2000 },
        { 'name': 'Aayush',  "city" : "Chicago",  "country" : "USA"  , "email":"aayush@simpsons.com", "phone":"555-222-1254", "salary" : 18222.00, "bonus" : 2000  }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

Ext.create('Ext.grid.Panel', {
    title: 'Simpsons',
    // hideHeaders : true,
    // border : false,
     height: 350,
    width: 650,
    renderTo: Ext.getBody(),
    enableLocking : true,
    columnLines:true,
    cls : 'extra-alt',
    viewConfig: {
      stripeRows: true
      , getRowClass: function(record) { 
           return 'wordwrap'; 
      }
    },

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: [
          '<div style = "background-color:#b0c4de;">',
          '{columnName}: {name:this.formatName} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
          '</div>',
          {
              formatName: function(name) {
                  return Ext.String.trim(name);
              }
          }
        ],
        hideGroupedHeader: true,
        startCollapsed: true,
        collapsible : true,
        showSummaryRow : true,
        id: 'CityGrouping'
    }],
   // selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1
        })
    ],

    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        {
          text: 'Name', 
          dataIndex: 'name',
          flex: 1
         },
       {
         text: 'City', 
         dataIndex: 'city'
        
       },
        {
          text: 'Email',
          dataIndex: 'email',
          flex: 2,
          editor : 'textfield',
          summaryType : function(records) {
             return records[0].get('cityGroup');
          }
        },
        {
            text: 'Phone',
            dataIndex: 'phone',
            hideable : false,
            sortable : false,
            draggable : false,
            locked : true,
            lockable : false
        },
      {
        text: 'Renumerations',
        columns : [{
          text: 'Salary',
          dataIndex: 'salary',
          type: 'float',
          summaryType: 'average',
          renderer: function(value, metaData, record, row, col, store, gridView){
            if (value >= 13000 ) {
               metaData.style = 'color:red;font-weight:bold;background:yellow;'
            } else {
    		   metaData.tdAttr = 'data-qtip="' + 'Salary revision is required!"'; 
            }
            
            return value;
            
          }
        },
       {
          text: 'Bonus <img style="margin-left:85px;" title="Delete" src = "resources/images/delete.png"></img>',
          dataIndex: 'bonus',
          type: 'float',
          summaryType : 'sum'
       }]
      },
      {
        xtype : 'actioncolumn',
        text : 'Row Action',
        width : 80,
        items : [ 
          {
            icon : 'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/pen-16.png'
          }, 
          {
            icon : 'https://cdn1.iconfinder.com/data/icons/softwaredemo/PNG/16x16/DeleteRed.png'
          },
          {
                icon: 'https://cdn2.iconfinder.com/data/icons/snipicons/5000/arrow-up-16.png',
              	getClass : function( v, meta, record ) {
                    if ( record.get('name')== 'Peter' ) {                                                                                                                                         
                      	return 'x-hide-display';
                    }
                }
				
             } 
        ]
    }

    ],
  tbar  : Ext.create( 'Ext.toolbar.Toolbar', {
    items : [
    {
		xtype : 'tbtext',
		text : 'Sorting order:',
		reorderable : false
    }, {
       text : 'Salary',
       icon : 'https://cdn1.iconfinder.com/data/icons/fatcow/16/sort_ascending.png',
       reorderable : true
    }, {
       text : 'Bonus',
       icon : 'https://cdn1.iconfinder.com/data/icons/fatcow/16/sort_ascending.png',
       reorderable : true
    }
    
    ]}),
    bbar: Ext.create('Ext.PagingToolbar', {
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        displayInfo: true,
        displayMsg: 'Showng {0} - {1} of {2} contacts',
        emptyMsg : "Nothing to show",
      items :[
        '->',{
          icon : 'https://cdn1.iconfinder.com/data/icons/hallowen_linux/16/Black_Cat.png'
        },
        '-',  
         {
                text: 'Additional Buttons'
            }
        ]
    }),
    listeners: {
      itemcontextmenu : function( grid, record, item, index, event, eOpts ) {
            showMenu(grid, index, event);
       }
   }
});
});
