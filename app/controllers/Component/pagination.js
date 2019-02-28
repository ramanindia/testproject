class Pagination{

constructor(totalCount,currentPage,pageUri,perPage=2,searchString)
{
    this.perPage = perPage;
    this.totalCount =parseInt(totalCount);
    this.currentPage = parseInt(currentPage);
    this.previousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
    this.pageCount = Math.ceil(this.totalCount / this.perPage);
    this.pageUri = pageUri;
    this.offset  = this.currentPage > 1 ? this.previousPage * this.perPage : 0;
    this.sidePages = 4;
    this.pages = false;
	this.searchString = searchString;
}

links()
{
	
	 let setqueryStringData='';
	 delete this.searchString.page;
	 if(JSON.stringify(this.searchString)!='{}')
	 {
		  for(var key in this.searchString) 
		  {    
	        let keyValue = this.searchString[key];
			
			   setqueryStringData = setqueryStringData+ key+"="+keyValue.replace(/\s\s+/g, ' ')+'&';
		   }
		 setqueryStringData = '&'+setqueryStringData.substring(0, setqueryStringData.length-1);
	 }
	
    this.pages='<ul class="pagination pagination-md">';

    if(this.previousPage > 0)
        this.pages+='<li class="page-item"><a class="page-link" href="'+this.pageUri + '?page='+this.previousPage+setqueryStringData+'">Previous</a></li>';


        /*Add back links*/
        if(this.currentPage > 1){
            for (var x = this.currentPage - this.sidePages; x < this.currentPage; x++) {
                if(x > 0)
                    this.pages+='<li class="page-item"><a class="page-link" href="'+this.pageUri+'?page='+x+setqueryStringData+'">'+x+'</a></li>';
            }
        }

        /*Show current page*/
        this.pages+='<li class="page-item active"><a class="page-link" href="'+this.pageUri+'?page='+this.currentPage+setqueryStringData+'">'+this.currentPage+'</a></li>';

        /*Add more links*/
        for(x = this.nextPage; x <= this.pageCount; x++){

            this.pages+='<li class="page-item"><a class="page-link" href="'+this.pageUri+'?page='+x+setqueryStringData+'">'+x+' </a></li>';
			//console.log(x);
			//console.log(this.sidePages);
            if(x >= this.currentPage + this.sidePages)
                break;
        }


        /*Display next buttton navigation*/
        if(this.currentPage + 1 <= this.pageCount)
            this.pages+='<li class="page-item"><a class="page-link" href="'+this.pageUri+ '?page='+this.nextPage+setqueryStringData+'">Next</a></li>';

        this.pages+='</ul>';

    return this.pages;
}
}
module.exports = Pagination;