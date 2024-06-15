export interface IPromotion {
  promotion_id: number;
  promotion_title: string;
  promotion_description: string;
  minimum_days_of_stay: number;
  is_deactivated: boolean;
  price_factor: number;
}

export interface IRoomDetails {
  room_type_id: number;
  room_type_name: string;
  area_in_square_feet: number;
  single_bed: number;
  double_bed: number;
  max_capacity: number;
  minRates: number;
  ratings:number;
  count:number;
  minRoomCount:number;
}
