<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Listing;

class ListingController extends Controller
{
    private function add_image_urls($model, $id) {
        for($i = 1; $i <=4; $i++) {
            $model['image_' . $i] = asset('images/' . $id . '/Image_' . $i . '.jpg');
        }
        return $model;
    }

    public function get_listing_api(Listing $listing) {
        $model = $listing->toArray();
        $model = $this->add_image_urls($model, $listing->id);
        return response()->json($model);
    }

    public function get_listing_web(Listing $listing) {
        $model = $listing->toArray();
        $model = $this->add_image_urls($model, $listing->id);
        $model['path'] = '/listing/' . $listing->id;
        return view('app', ['model' => $model]);
    }

    private function get_listings_grouped_by_country()
    {
        $collection = Listing::all(['id', 'address', 'title', 'price_per_night']);
        $collection->transform(function($listing) {
            $listing->thumb = asset('images/' . $listing->id . '/Image_1_thumb.jpg');
            return $listing;
        });
        return $collection->groupBy(function($listing) {
            foreach ([ 'Taiwan', 'Poland', 'Cuba' ] as $country) {
                $pos = strpos($listing['address'], $country);
                if ($pos !== FALSE) {
                    return $country;
                }
            }
        });
    }

    public function get_home_web()
    {
        $collection = collect([
            'listing_groups' => $this->get_listings_grouped_by_country(),
            'path' => '/'
        ]);
        $model = $collection->toArray();
        return view('app', ['model' => $model]);
    }

    public function get_home_api()
    {
        return response()->json(collect([ 'listing_groups' => $this->get_listings_grouped_by_country() ]));
    }
}
