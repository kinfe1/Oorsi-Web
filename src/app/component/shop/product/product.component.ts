import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { Component, OnInit } from "@angular/core";


/**
 * Component that is used to display a search bar on the top and load the list and detail of product
 * on the bottom. It accepts the s query and passed it to the searchString property to be displayed in the search bar.
 */
@Component({
  selector: "oorsi-web-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {

  /**
   * holds the search string to be passed to the search route query parameter and also to display
   * the search string in the template, uses two way binding.
   */
  searchString: string;
  /**
   * holds the subscription for route query param values to be unsubscribed on destroy
   */
  private subscription: Subscription;

  /**
   *
   * @param route the activate route, used to get the s query param
   * @param router the router, to be used for navigating to the search page with the query param
   */
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    /**
     * subscribe to query params to get the query "s" and pass it to the propery searchString
     */
    this.subscription = this.route.queryParams.subscribe((queryParam: any) => {
      this.searchString = queryParam["s"];
    });
  }

  ngOnDestroy() {
    /**
     * unsubscribe on init subscribed observables
     */
    this.subscription.unsubscribe();
  }

  /**
   * action to be called when the search form is submitted.
   */
  onSearch() {
    this.router.navigate(["/shop/search"], {
      queryParams: { s: this.searchString }
    });
  }
}
